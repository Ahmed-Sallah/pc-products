import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  newProductArr: any[]
  brandList = new Set<string>()
  private productSub: Subscription
  private filteredSub: Subscription
  search = ''

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const type = params['type']
      this.productsService.getProducts(type)
    })
    this.productSub = this.productsService.getProductsUpdateListener()
    .subscribe((products: Product[]) => {
      this.products = products
      this.brandList.clear()
      for(let p of this.products) {
        this.brandList.add(p.brand)
      }
    })

    this.filteredSub = this.productsService.getFilteredProductsListener()
    .subscribe((products: Product[]) => {
      this.products = products
    })
  }

  showProduct(id: string) {
   this.router.navigate([id], {relativeTo: this.route})
  }

  onFilter(form: NgForm) {
    this.productsService.filter(form, this.brandList)
  }

  onAddToCart(product: Product) {
    this.productsService.addToCart(product, 1)
  }


  ngOnDestroy(): void {
    this.productSub.unsubscribe()
    this.filteredSub.unsubscribe()
  }

}
