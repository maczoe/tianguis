import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Category } from '../markteplace/model/category';
import { Product } from '../markteplace/model/product';
import { CategoriesService } from '../markteplace/services/categories.service';
import { ProductsService } from '../markteplace/services/products.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  categories: Category[] = [];
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
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data) => {

      this.categories = data;
    });
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
}
