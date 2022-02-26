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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrModule } from 'ngx-toastr';
import { WishListComponent } from './products/wish-list/wish-list.component';
import { AccountComponent } from './Account/account.component';
import { EditAccountComponent } from './Account/account-edit/account-edit.component';
import { SideNavComponent } from './Account/sideNav/sidenav.component';
import { ShowAccountComponent } from './Account/account-show/account-show.component';
import { AccPassChangeComponent } from './Account/acc-pass-change/acc-pass-change.component';
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
    WishListComponent,
    AccountComponent,
    EditAccountComponent,
    ShowAccountComponent,
    SideNavComponent,
    AccPassChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddToCartDialog]
})
export class AppModule { }
