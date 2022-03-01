import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product
  isAdmin = false
  private isAdminStatusListener: Subscription
  constructor(private authService: AuthService, private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id']
      const type = params['type']
      this.productsService.getProduct(id, type)
        .subscribe((productData) => {

          this.product = productData.product

        })
    })

    this.isAdmin = this.authService.getIsAdmin()
    this.isAdminStatusListener = this.authService.getIsAdminStatusListener()
      .subscribe(isadmin => {
        this.isAdmin = isadmin
      })
  }


  onAddToCart(qty: any) {
    this.productsService.addToCart(this.product, +qty)
  }

  onAddToWishList(product: Product) {
    this.authService.addToWishList(product)
  }

  ngOnDestroy(): void {
    this.isAdminStatusListener.unsubscribe()
  }

}
