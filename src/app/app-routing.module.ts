import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './products/home/home.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products/:type', component: ProductsShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
