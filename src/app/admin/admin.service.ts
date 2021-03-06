import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { NotificationService } from "../Notification/notification.service";
import { Product } from "../products/product.model";
import { Account } from "./account.model";
import { Order } from "./order.model";

@Injectable({providedIn: 'root'})

export class AdminService {

  products: Product[]
  accounts: Account[]
  private productUpdated = new Subject<Product[]>()
  private accountsUpdated = new Subject<Account[]>()


  constructor(private http: HttpClient, private notify: NotificationService, private router: Router) {}

  getProducts() {
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/admin/get-products')
      .subscribe(response => {
        this.products = response.products
        this.productUpdated.next([...this.products])
      })
  }

  getProduct(id: string) {
    return this.http.get<{product: Product}>('http://localhost:3000/admin/get-product/' + id)
  }

  getProductsUpdateListener() {
    return this.productUpdated.asObservable()
  }

  addProduct(product) {
    this.http.post<{title: string, message: string}>('http://localhost:3000/admin/add-product', product)
      .subscribe(response => {
        this.notify.showSuccess(response.title, response.message)
      })
  }

  updateProduct(id: string, product: Product) {
    console.log(product)
    this.http.put<{title: string, message: string}>('http://localhost:3000/admin/update-product/' + id, {product})
      .subscribe(response => {
        console.log(response)
        this.notify.showSuccess(response.title, response.message)
        this.router.navigate(['admin', 'all-products'])
      })

  }

  deleteProduct(productId: string) {
    this.http.delete<{title: string, message: string}>('http://localhost:3000/admin/delete-product/' + productId)
      .subscribe(response => {
        this.products = this.products.filter(p => p._id !== productId)
        this.productUpdated.next([...this.products])
        this.notify.showSuccess(response.title, response.message)
      })
  }


  getAccounts() {
    this.http.get<{users: Account[]}>('http://localhost:3000/admin/get-accounts')
      .subscribe(response => {
        this.accounts = response.users
        this.accountsUpdated.next([...this.accounts])
      })
  }

  getAccountsUpdateListener() {
    return this.accountsUpdated.asObservable()
  }

  deleteAccount(accId: string) {
    this.http.delete<{title: string, message: string}>('http://localhost:3000/admin/delete-account/' + accId)
      .subscribe(response => {
        this.notify.showSuccess(response.title, response.message)
        this.accounts = this.accounts.filter(a => a._id !== accId)
        this.accountsUpdated.next([...this.accounts])
      })
  }

  getOrders() {
    return this.http.get<{orders: Order[]}>('http://localhost:3000/admin/get-orders')
  }

  getOrder(id: string) {
    return this.http.get<{order: Order}>('http://localhost:3000/admin/get-order/' + id)
  }

  deleteOrder(orderId: string) {
    this.http.delete<{order: Order}>('http://localhost:3000/admin/delete-order/' + orderId)
      .subscribe(response => {
        this.notify.showSuccess("Success", 'Order Completed')
        this.router.navigate(['admin', 'orders'])
      })
  }
}
