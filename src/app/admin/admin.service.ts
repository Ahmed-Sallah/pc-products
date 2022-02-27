import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../products/product.model";

@Injectable({providedIn: 'root'})

export class AdminService {

  products: Product[]
  private productUpdated = new Subject<Product[]>()

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/admin/get-products')
      .subscribe(response => {
        this.products = response.products
        this.productUpdated.next([...this.products])
      })
  }

  getProductsUpdateListener() {
    return this.productUpdated.asObservable()
  }

}
