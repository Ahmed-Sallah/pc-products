import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './products/home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:type', component: ProductsShowComponent},
  {path: 'products/:type/:id', component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
