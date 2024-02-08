import { SearchComponent } from './components/search/search.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SwiperModule } from 'swiper/angular';
import { DiscountedProductListComponent } from './components/discounted-product-list/discounted-product-list.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { RecommendedProfileListComponent } from './components/recommended-profile-list/recommended-profile-list.component';
import { RecommendedProductListComponent } from './components/recommended-product-list/recommended-product-list.component';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { ResponseQuoteComponent } from './components/response-quote/response-quote.component';
import { ResponseQuoteListComponent } from './components/response-quote-list/response-quote-list.component';
import { CouponsListComponent } from './components/coupons-list/coupons-list.component';
import { CouponCardComponent } from './components/coupon-card/coupon-card.component';
import { LaunchComponent } from './components/launch/launch.component';
import { LaunchListComponent } from './components/launch-list/launch-list.component';
import { IonicModule } from '@ionic/angular';
import { ProductCardHrzComponent } from './components/product-card-hrz/product-card-hrz.component';
import { ListProductCardBigComponent } from './components/list-product-card-big/list-product-card-big.component';
import { ProductCardBigComponent } from './components/product-card-big/product-card-big.component';
import { ReviewComponent } from './components/review/review.component';
import { CustomDatePipe } from '../core/pipes/customDate.pipe';

@NgModule({
  declarations: [
    CategoryCardComponent,
    CategoryListComponent,
    ProductCardComponent,
    DiscountedProductListComponent,
    ProfileCardComponent,
    RecommendedProfileListComponent,
    RecommendedProductListComponent,
    SearchComponent,
    QuoteComponent,
    QuoteListComponent,
    ResponseQuoteComponent,
    ResponseQuoteListComponent,
    CouponCardComponent,
    CouponsListComponent,
    LaunchComponent,
    LaunchListComponent,
    ProductCardHrzComponent,
    ListProductCardBigComponent,
    ProductCardBigComponent,
    ReviewComponent
  ],
  imports: [CommonModule, IonicModule, SwiperModule],
  exports: [
    CategoryCardComponent,
    CategoryListComponent,
    ProductCardComponent,
    DiscountedProductListComponent,
    ProfileCardComponent,
    RecommendedProfileListComponent,
    RecommendedProductListComponent,
    SearchComponent,
    QuoteListComponent,
    ResponseQuoteComponent,
    ResponseQuoteListComponent,
    CouponCardComponent,
    CouponsListComponent,
    LaunchComponent,
    LaunchListComponent,
    ProductCardHrzComponent,
    ListProductCardBigComponent,
    ProductCardBigComponent,
    ReviewComponent,
  ],
})
export class MarkteplaceModule {}
