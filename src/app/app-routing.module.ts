import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccPassChangeComponent } from './Account/acc-pass-change/acc-pass-change.component';
import { EditAccountComponent } from './Account/account-edit/account-edit.component';
import { ShowAccountComponent } from './Account/account-show/account-show.component';
import { AccountComponent } from './Account/account.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminComponent } from './admin/admin.components';
import { ShowAccountsComponent } from './admin/show-accounts/show-accounts.component';
import { ShowOrdersComponent } from './admin/show-orders/show-orders.component';
import { ShowProductsComponent } from './admin/show-products/show-products.component';
import { AdminPageGuard } from './auth/AdminPageGuard.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutPageComponent } from './products/checkout-page/checkout-page.component';
import { HomeComponent } from './products/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';
import { ProductsComponent } from './products/products.component';
import { WishListComponent } from './products/wish-list/wish-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'prefix'},
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminPageGuard],
    children: [
      {path: 'admin/orders', component: ShowOrdersComponent},
      {path: 'admin/all-products', component: ShowProductsComponent},
      {path: 'admin/add-product', component: AddProductComponent},
      {path: 'admin/accounts', component: ShowAccountsComponent}
    ]
  },
  {
    path: '',
    component: ProductsComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'products/:type', component: ProductsShowComponent},
      {path: 'products/:type/:id', component: ProductDetailsComponent},
      {path: 'wish-list', component: WishListComponent, canActivate: [AuthGuard]},
      {path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'info', component: ShowAccountComponent},
      {path: 'edit', component: EditAccountComponent},
      {path: 'change-pass', component: AccPassChangeComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminPageGuard]
})
export class AppRoutingModule { }
