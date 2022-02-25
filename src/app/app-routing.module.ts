import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.components';
import { AdminPageGuard } from './auth/AdminPageGuard.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditAccountComponent } from './products/edit-account/edit-account.component';
import { HomeComponent } from './products/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
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
      {path: '', component: HomeComponent},
      {path: 'products/:type', component: ProductsShowComponent},
      {path: 'products/:type/:id', component: ProductDetailsComponent},
      {path: 'edit/account', component: EditAccountComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminPageGuard]
})
export class AppRoutingModule { }
