import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  items: {_id: string, name: string, price: number, qty: number, image: string}[]
  private cartListenerSub: Subscription
  private authStatusListener: Subscription
  private isAdminStatusListener: Subscription
  userIsAuthenticated = false
  isAdmin = false

  constructor(private productsService: ProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusListener = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        console.log(this.userIsAuthenticated)
      })
    this.isAdmin = this.authService.getIsAdmin()
    this.isAdminStatusListener = this.authService.getIsAdminStatusListener()
      .subscribe(isadmin => {
        this.isAdmin = isadmin
      })
    this.items = this.productsService.getItemsInCart()
    this.cartListenerSub = this.productsService.getCartListener()
      .subscribe(items => {
        this.items = items
      })
  }

  onDeleteFromStock(item: {_id: string, name: string, price: number, qty: number, image: string}) {
    this.productsService.deleteFromCart(item)
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.cartListenerSub.unsubscribe()
    this.authStatusListener.unsubscribe()
    this.isAdminStatusListener.unsubscribe()
  }

}
