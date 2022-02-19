import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "./product.model";

@Injectable({providedIn: 'root'})

export class ProductsService {
  private products: Product[] = []
  private productUpdated = new Subject<Product[]>()
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
}
