import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { Category } from '../markteplace/model/category';
import { Product } from '../markteplace/model/product';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

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
  categories: Category[] = [];
  images: LocalFile[] = [];
  categoriesSelect = [];
  product: Product = {
    profileId: 3,
  };
  cat: Category = {
    id: 1,
    name: '',
  };
  constructor(
    private categoriesService: CategoriesService,
    private serviceProduct: ProductsService,
    private navCtrl: NavController,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {
    this.platform = platform;
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.loadFiles();
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

  async loadinFileData(filesNames) {
    for (const f of filesNames) {
      console.log(f);

      const filepath = `${IMAGE_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filepath,
      });

      console.log(readFile);

      this.images.push({
        name: f,
        path: filepath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
    console.log(this.images);
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

  onSubmit() {
    const images: string = this.product.imagesUrl;
    this.product.images = images.split(',');
    this.serviceProduct.createProduct(this.product).subscribe((data) => {
      console.log(data);
      this.navCtrl.navigateRoot('/app/tabs/home', { animated: true });
    });
    console.log(JSON.stringify(this.product));
  }
  handleStatus(e) {
    this.product.status = e.detail.value;
  }
  handleType(e) {
    this.product.type = e.detail.value;
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      this.saveImage(image);
    }
  }

  async selectImageCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    console.log(image);

    if (image) {
      this.saveImage(image);
    }
  }


  async saveImage(phto: Photo) {
    const base64Data = await this.readAsBase64(phto);
    console.log(base64Data);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
    });

    console.log('Saved: ', savedFile);
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
    this.loadFiles();
  }
}
