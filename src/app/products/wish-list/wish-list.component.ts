import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishListItems: Product[]
  constructor(private authService: AuthService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.authService.getItemsInWishList()
      .subscribe(response => {
        this.wishListItems = response.wishList
      })
  }

  onAddToCart(item: Product) {
    this.productsService.addToCart(item, 1)
  }

  onRemoveFromWishList(itemId: string) {
    this.authService.removeItemFromWishList(itemId)
  }

}
