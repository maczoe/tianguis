import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { Profile } from '../markteplace/model/profile';
import {
  ActionSheetController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.mock';
import { ProfilesService } from '../markteplace/services/profiles.service';

const IMAGE_DIR = 'stored-images';
interface LocalFile {
  name?: string;
  path?: string;
  data?: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: Profile = {};
  upProfile: Profile = {};
  images: LocalFile[] = [];
  result: string;
  products = [];
  type = 'profile';
  private api = environment.urlapi;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private http: HttpClient,
    private profileService: ProfilesService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.authService.validaToken();
    this.profile = this.authService.respUser.profile;
    this.loadFiles();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleciona una opción para actualizar',
      buttons: [
        {
          text: 'Cámara',
          role: 'camera',
          data: {
            action: 'camera',
          },
        },
        {
          text: 'Galeria',
          role: 'galery',
          data: {
            action: 'galery',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if (result.role === 'camera') {
      console.log('Open Camera');
      this.selectImageCamera();
    }
    if (result.role === 'galery') {
      console.log('Open Galery');
      this.selectImage();
    }
  }

  segmentChanged($event) {}
  /* IMAGE UPLOAD */
  async loadFiles() {
    this.images = [];
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data...',
    });

    await loading.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR,
    })
      .then(
        (result) => {
          this.loadinFileData(result.files);
        },
        async (err) => {
          console.log('Err:', err);
          await Filesystem.mkdir({
            directory: Directory.Data,
            path: IMAGE_DIR,
          });
        }
      )
      .then(() => {
        loading.dismiss();
      });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image) {
      await this.saveImage(image);
    }
  }

  async selectImageCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    if (image) {
      await this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    /* Delete other Images */
    const clearImgs = this.images.map(async (file) => {
      await this.deleteImage(file);
    });
    await Promise.all(clearImgs);
    this.images = [];
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });
    await this.loadFiles();
    await this.uploadImageProfile();
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async loadinFileData(filesNames) {
    for (const f of filesNames) {
      const filepath = `${IMAGE_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filepath,
      });
      this.images.push({
        name: f,
        path: filepath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }
  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    await this.loadFiles();
  }

  async uploadImageProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo Imagen...',
    });
    await loading.present();
    const uploadPromises = this.images.map(async (file) => {
      const response = await fetch(file.data);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, file.name);
      const data = await this.uploadFile(formData).toPromise();

      this.profile.photo = data.secureUrl;
      const { id, createAt, updateAt, ...upPro } = this.profile;
      this.profileService.updateProfile(upPro).subscribe((resp) => {
        this.navCtrl.navigateRoot('/app/tabs/my-profile', {
          animated: true,
        });
      });

      await this.deleteImage(file);
    });

    await Promise.all(uploadPromises);
    loading.dismiss();
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.api}files/profiles`, formData);
  }

  /* Updated form */

  async updated() {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando...',
    });
    await loading.present();

    const { id, createAt, updateAt, ...upPro } = this.profile;
    this.profileService.updateProfile(upPro).subscribe((resp) => {
      loading.dismiss();

      this.navCtrl.navigateRoot('/app/tabs/my-profile', {
        animated: true,
      });
    });
  }
}
