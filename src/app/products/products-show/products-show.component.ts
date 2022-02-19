import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-show',
  templateUrl: './products-show.component.html',
  styleUrls: ['./products-show.component.css']
})
export class ProductsShowComponent implements OnInit, OnDestroy {
  products: Product[]
  private productSub: Subscription

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const type = params['type']
      this.productsService.getProducts(type)
    })
    this.productSub = this.productsService.getProductsUpdateListener()
    .subscribe((products: Product[]) => {
      this.products = products
    })
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe()
  }

}
