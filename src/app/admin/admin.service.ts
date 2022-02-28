import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotificationService } from "../Notification/notification.service";
import { Product } from "../products/product.model";
import { Account } from "./account.model";

@Injectable({providedIn: 'root'})

export class AdminService {

  products: Product[]
  accounts: Account[]
  private productUpdated = new Subject<Product[]>()
  private accountsUpdated = new Subject<Account[]>()


  constructor(private http: HttpClient, private notify: NotificationService) {}

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

  addProduct(product) {
    this.http.post<{title: string, message: string}>('http://localhost:3000/admin/add-product', product)
      .subscribe(response => {
        this.notify.showSuccess(response.title, response.message)
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
      .subscribe(respnse => {
        this.accounts = respnse.users
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
}
