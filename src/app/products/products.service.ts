import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "./product.model";

@Injectable({providedIn: 'root'})

export class ProductsService {
  private products: Product[] = []
  private productUpdated = new Subject<Product[]>()
  private filteredProducts = new Subject<Product[]>()
  constructor(private http: HttpClient) {}

  getProducts(type: string) {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/products/' + type)
      .subscribe(productData => {
        this.products = productData.products
        this.productUpdated.next([...this.products])
      })
  }

  getProductsUpdateListener() {
    return this.productUpdated.asObservable()
  }

  getProduct(id: string, type: string) {
    return this.http.get<{message: string, product: Product}>('http://localhost:3000/products/' + type + '/' + id)
  }

  filterByBrand($event) {
    if($event.target.checked) {
      const filteredProducts: Product[] = this.products.filter(p => p.brand === $event.target.defaultValue)
      this.filteredProducts.next([...filteredProducts])
    } else {
      this.filteredProducts.next([...this.products])
    }
  }

  filterByStock($event) {
    if($event.target.checked) {
      let filteredProducts: Product[]
      if($event.target.defaultValue === 'inStock') {
        filteredProducts = this.products.filter(p => p.availability === true)
        console.log(filteredProducts)
        this.filteredProducts.next([...filteredProducts])
      } else if($event.target.defaultValue === 'outOfStock') {
        filteredProducts = this.products.filter(p => p.availability === false)
        console.log(filteredProducts)
        this.filteredProducts.next([...filteredProducts])
      }
    } else {
      this.filteredProducts.next([...this.products])
    }
  }

  getFilteredProductsListener() {
    return this.filteredProducts.asObservable()
  }

}
