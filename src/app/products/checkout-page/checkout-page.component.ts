import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  private cartListenerSub: Subscription
  items: {_id: string, name: string, price: number, qty: number, image: string, brand: string}[]
  totalPrice: number = 0

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.items = this.productsService.getItemsInCart()
    this.cartListenerSub = this.productsService.getCartListener()
    .subscribe(items => {
      this.items = items
      if(this.items.length === 0) {
        this.router.navigate(['products', 'motherboards'])
      }
    })
    console.log(this.items)
    for(let item of this.items) {
      this.totalPrice += item.price
    }
  }

  onAddOrder(form: NgForm) {
    const address = {gover: form.value.governorate, area: form.value.areaName, street: form.value.streetName}
    this.productsService.addOrder(address, this.items)
  }

  onDeleteFromCart(item) {
    this.productsService.deleteFromCart(item)
  }

  ngOnDestroy(): void {
    this.cartListenerSub.unsubscribe()

  }

}
