import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';
import { Product } from '../../model/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

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
  constructor(
    private router: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {
    this.categoryId = parseInt(this.router.snapshot.paramMap.get('idCategory'));

    this.getCategory(this.categoryId);
    this.getProductsCategory(this.categoryId);
  }

  ngOnInit() {}

  getCategory(categoryId: number) {
    this.categoriesService.getCategoryId(categoryId).then((data: Category) => {
      this.category = data;
    });
  }

  getProductsCategory(categoryId: number) {
    this.productsService
      .getProductCategory(categoryId)
      .subscribe((resp: Product[]) => {
        this.products = resp;
      });
  }
}
