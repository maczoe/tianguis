import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonModal,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { Category } from '../markteplace/model/category';
import { Product } from '../markteplace/model/product';
import { ProductsService } from '../markteplace/services/products.service';
import { Storage } from '@ionic/storage-angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { environment } from 'src/environments/environment.mock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Capacitor } from '@capacitor/core';
import { NgForm } from '@angular/forms';
import { UiAlertsService } from '../core/services/ui-alerts.service';

const IMAGE_DIR = 'stored-images';
interface LocalFile {
  name: string;
  path: string;
  data: string;
}
@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  images: LocalFile[] = [];
  categoriesSelect = [];
  product: Product = {
    profileId: 3,
    images: [],
    oldPrice: 0,
  };
  cat: Category = {
    id: 1,
    name: '',
  };
  inOfer = false;
  selectedStatus = '';
  selectedType = '';

  categories: Category[] = [];
  selectedCategoryCount = 0;
  selectedCategory: Category[] = [];

  private imgUlrs: string[] = [];
  private api = environment.urlapi;
  constructor(
    private serviceProduct: ProductsService,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private authService: AuthService,
    private storage: Storage,
    private navCtrl: NavController,
    private uiAlerts: UiAlertsService
  ) {
    this.platform = platform;
  }

  async ngOnInit() {
    await this.storage.create();
    await this.authService.validaToken();
    this.loadFiles();
    await this.requestPermissions();
  }
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
          console.log('HERE :', result);
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
  productOfer(ofer: boolean) {
    this.inOfer = ofer;
  }
  //Reset from
  resetForm(frm: NgForm) {
    this.images = [];
    this.selectedCategory = [];
    this.imgUlrs = [];
    this.product = {
      profileId: 3,
      images: [],
      oldPrice: 0,
    };
    this.selectedStatus = '';
    this.selectedType = '';
    frm.reset();
  }

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

  handleChange(ev) {
    const cat: Category[] = ev.target.value;
    const catIds: number[] = [];
    cat.forEach((c) => {
      catIds.push(c.id);
    });
    this.product.categoriesIds = catIds;
    this.categoriesSelect = ev.target.value;
  }

  async onSubmit(frm: NgForm) {
    const catIds: number[] = [];
    const loading = await this.loadingCtrl.create({
      message: 'Registrando Producto...',
    });
    await loading.present();

    const uploadPromises = this.images.map(async (file) => {
      const response = await fetch(file.data);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', blob, file.name);
      const data = await this.uploadFile(formData).toPromise();
      this.product.images.push(data.secureUrl);
      await this.deleteImage(file);
    });

    await Promise.all(uploadPromises);

    this.selectedCategory.forEach((cat) => {
      catIds.push(cat.id);
    });
    this.product.categoriesIds = catIds;
    this.serviceProduct.createProduct(this.product).subscribe(
      (data) => {
        console.log(data);
        loading.dismiss();
        this.resetForm(frm);
        this.navCtrl.navigateRoot('/app/tabs/home', { animated: true });
      },
      (err) => {
        console.error('Error:', err);
        loading.dismiss();
        this.uiAlerts.alertaInfo(
          'Ocurrió un error al crear el producto. Por favor, inténtalo de nuevo.'
        );
      }
    );
    loading.dismiss();
    this.resetForm(frm);
  }
  handleStatus(e) {
    this.product.status = e.detail.value;
  }
  handleType(e) {
    this.product.type = e.detail.value;
  }

  async requestPermissions() {
    if (Capacitor.isNativePlatform()) {
      const permissions = await Camera.requestPermissions();
      if (permissions.camera === 'denied' || permissions.photos === 'denied') {
        console.log('Permisos', permissions);
      }
    }
  }

  async selectImage() {
    await this.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      saveToGallery: false,
    });

    if (image) {
      this.saveImage(image);
    }
  }

  async selectImageCamera() {
    await this.requestPermissions();

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(phto: Photo) {
    const base64Data = await this.readAsBase64(phto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });

    this.loadFiles();
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

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path,
    });
    await this.loadFiles();
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.api}files/product`, formData);
  }

  /* Search Category */
  private formatData(data: Category[]) {
    return data.length;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  categorySelectionChanged(categories: Category[]) {
    this.selectedCategory = categories;
    console.log('Selec C:', categories);

    this.selectedCategoryCount = this.formatData(this.selectedCategory);
    this.modal.dismiss();
  }
}
