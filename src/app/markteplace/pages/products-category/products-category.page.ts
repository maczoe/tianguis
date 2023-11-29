import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavoriteProductService } from '../../services/favorite-product.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.page.html',
  styleUrls: ['./products-category.page.scss'],
})
export class ProductsCategoryPage implements OnInit {
  categoryId = 0;
  products: Product[] = [];
  category: Category = {
    id: 0,
    name: '',
  };
  user;
  productsFavorite = [];
  constructor(
    private router: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private authService: AuthService,
    private favProductSvc: FavoriteProductService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getUserData();
    this.categoryId = parseInt(
      this.router.snapshot.paramMap.get('idCategory'),
      10
    );
    this.getCategory(this.categoryId);
    this.getProductsCategory(this.categoryId);
  }

  getCategory(categoryId: number) {
    this.categoriesService.getCategoryId(categoryId).then((data: Category) => {
      this.category = data;
    });
  }

  getProductsCategory(categoryId: number) {
    this.productsService
      .getProductCategory(categoryId)
      .subscribe(async (resp: Product[]) => {
        await this.getFavoriteProducts();
        this.products = resp;
      });
  }

  async getFavoriteProducts() {
    this.favProductSvc
      .getFavoriteProducts(this.user.profile.id)
      .subscribe((data) => {
        console.log(data, this.user.profile.id);
        this.productsFavorite = data;
      });
  }
}
