import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ProductsShowComponent } from './products/products-show/products-show.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HomeComponent } from './products/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { AddToCartDialog } from './CartDialog/addToCartDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsShowComponent,
    ProductDetailsComponent,
    HomeComponent,
    AddToCartDialog,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddToCartDialog]
})
export class AppModule { }
