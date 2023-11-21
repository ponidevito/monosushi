import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../app/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'actions',
    loadChildren: () =>
      import('../app/pages/actions/actions.module').then(
        (m) => m.ActionsModule
      ),
  },
  {
    path: 'product/:category',
    loadChildren: () =>
      import('../app/pages/rolls/rolls.module').then((m) => m.RollsModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('../app/pages/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('../app/pages/delivery/delivery.module').then(
        (m) => m.DeliveryModule
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('../app/pages/about-us/about-us.module').then(
        (m) => m.AboutUsModule
      ),
  },
  {
    path: 'oferta',
    loadChildren: () =>
      import('../app/pages/oferta/oferta.module').then((m) => m.OfertaModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/shared/modal/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'adress',
    loadChildren: () =>
      import('../app/shared/modal/adress/adress.module').then(
        (m) => m.AdressModule
      ),
  },
  {
    path: 'my-cabinet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/components/header/header.module').then(
        (m) => m.HeaderModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('../app/shared/modal/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
