import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
      import('./auth/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full',
  },
  {
    path: 'product/:idProduct',
    loadChildren: () => import('./markteplace/pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'detail-profile/:idProfile',
    loadChildren: () => import('./markteplace/pages/detail-profile/detail-profile.module').then( m => m.DetailProfilePageModule)
  },
  {
    path: 'new-quote',
    loadChildren: () => import('./modals/new-quote/new-quote.module').then( m => m.NewQuotePageModule)
  },
  {
    path: 'quote-response/:idQuote',
    loadChildren: () => import('./modals/quote-response/quote-response.module').then( m => m.QuoteResponsePageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
