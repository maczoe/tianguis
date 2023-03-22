import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './auth/guards/user.guard';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full',
  },
  {
    path: 'product/:idProduct',
    loadChildren: () =>
      import('./markteplace/pages/product/product.module').then(
        (m) => m.ProductPageModule
      ),
  },
  {
    path: 'detail-profile/:idProfile',
    loadChildren: () =>
      import('./markteplace/pages/detail-profile/detail-profile.module').then(
        (m) => m.DetailProfilePageModule
      ),
  },
  {
    path: 'new-quote',
    loadChildren: () =>
      import('./modals/new-quote/new-quote.module').then(
        (m) => m.NewQuotePageModule
      ),
  },
  {
    path: 'quote-response/:idQuote',
    loadChildren: () =>
      import('./modals/quote-response/quote-response.module').then(
        (m) => m.QuoteResponsePageModule
      ),
  },
  {
    path: 'detail-response-quote/:idReponse',
    // eslint-disable-next-line max-len
    loadChildren: () =>
      import(
        './markteplace/pages/detail-response-quote/detail-response-quote.module'
      ).then((m) => m.DetailResponseQuotePageModule),
  },
  {
    path: 'coupon-detail/:idCoupon',
    loadChildren: () =>
      import('./modals/coupon-detail/coupon-detail.module').then(
        (m) => m.CouponDetailPageModule
      ),
  },
  {
    path: 'chat-list',
    loadChildren: () =>
      import('./markteplace/pages/chat-list/chat-list.module').then(
        (m) => m.ChatListPageModule
      ),
  },
  {
    path: 'chat-list/:proId',
    loadChildren: () =>
      import('./markteplace/pages/chat-list/chat-list.module').then(
        (m) => m.ChatListPageModule
      ),
  },
  {
    path: 'chats',
    loadChildren: () =>
      import('./markteplace/pages/chats/chats.module').then(
        (m) => m.ChatsPageModule
      ),
  },
  {
    path: 'launch',
    loadChildren: () =>
      import('./launch/launch.module').then((m) => m.LaunchPageModule),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./markteplace/pages/notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
  {
    path: 'products-category/:idCategory',
    loadChildren: () =>
      import(
        './markteplace/pages/products-category/products-category.module'
      ).then((m) => m.ProductsCategoryPageModule),
  },
  {
    path: 'detail-undertake/:id',
    loadChildren: () =>
      import(
        './markteplace/pages/detail-undertake/detail-undertake.module'
      ).then((m) => m.DetailUndertakePageModule),
  },
  {
    path: 'google-sesion',
    loadChildren: () =>
      import('./markteplace/pages/google-sesion/google-sesion.module').then(
        (m) => m.GoogleSesionPageModule
      ),
  },
  {
    path: 'facebook-sesion',
    loadChildren: () =>
      import('./markteplace/pages/facebook-sesion/facebook-sesion.module').then(
        (m) => m.FacebookSesionPageModule
      ),
  },
  {
    path: 'complete-profile',
    loadChildren: () =>
      import(
        './markteplace/pages/complete-profile/complete-profile.module'
      ).then((m) => m.CompleteProfilePageModule),
  },
  {
    path: 'new-offer/:id',
    loadChildren: () =>
      import('./markteplace/pages/new-offer/new-offer.module').then(
        (m) => m.NewOfferPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
