import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './products/header/header.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HomeComponent } from './products/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { AddToCartDialog } from './CartDialog/addToCartDialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.components';
import { AdminHeader } from './admin/admin-header/admin-header.component';
import { EditAccountComponent } from './products/edit-account/edit-account.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AdminComponent,
    ProductsShowComponent,
    ProductDetailsComponent,
    HomeComponent,
    AddToCartDialog,
    SearchFilterPipe,
    LoginComponent,
    RegisterComponent,
    AdminHeader,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddToCartDialog]
})
export class AppModule { }
