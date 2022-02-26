import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './Account/account-edit/account-edit.component';
import { ShowAccountComponent } from './Account/account-show/account-show.component';
import { AccountComponent } from './Account/account.component';
import { AdminComponent } from './admin/admin.components';
import { AdminPageGuard } from './auth/AdminPageGuard.guard';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './products/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';
import { ProductsComponent } from './products/products.component';
import { WishListComponent } from './products/wish-list/wish-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'prefix'},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminPageGuard],
    children: [

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
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'info', component: ShowAccountComponent},
      {path: 'edit', component: EditAccountComponent}
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
