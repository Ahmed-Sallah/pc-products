import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  items: {_id: string, name: string, price: number, qty: number, image: string}[]
  private cartListenerSub: Subscription
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.items = this.productsService.getItemsInCart()
    this.cartListenerSub = this.productsService.getCartListener()
      .subscribe(items => {
        this.items = items
      })
  }

  onDeleteFromStock(item: {_id: string, name: string, price: number, qty: number, image: string}) {
    this.productsService.deleteFromCart(item)
  }

  ngOnDestroy(): void {
      this.cartListenerSub.unsubscribe()
  }

}
