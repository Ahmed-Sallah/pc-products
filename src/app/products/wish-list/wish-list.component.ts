import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit , OnDestroy{
  wishListItems: Product[]
  wishListSub: Subscription
  constructor(private authService: AuthService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.authService.getItemsInWishList()
    this.wishListSub = this.authService.getWishListUpdateListener()
      .subscribe(wishList => {
        this.wishListItems = wishList
      })
  }

  onAddToCart(item: Product) {
    this.productsService.addToCart(item, 1)
  }

  onRemoveFromWishList(itemId: string) {
    this.authService.removeItemFromWishList(itemId)
  }

  ngOnDestroy(): void {
    this.wishListSub.unsubscribe()
  }

}
