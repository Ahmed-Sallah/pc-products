import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit, OnDestroy {

  products: Product[]
  productsListenerSub: Subscription
  search = ''
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getProducts()
    this.productsListenerSub = this.adminService.getProductsUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products
      })
  }

  ngOnDestroy(): void {

  }

}
