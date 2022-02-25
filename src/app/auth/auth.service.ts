import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { NotificationService } from "../Notification/notification.service";
import { Product } from "../products/product.model";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })

export class AuthService {

  private authStatusListener = new Subject<boolean>()
  private isAdminStatusListener = new Subject<boolean>()
  private isAdmin = false
  private isAuth = false
  private token: string
  private tokenTimer: any
  private userId: string
  private itemsInWishList: Product[] = []
  private wishListUpdated = new Subject<Product[]>()

  constructor(private http: HttpClient, private router: Router, private notifyService : NotificationService) {}

  register(authData: AuthData) {
    this.http.post<{message: string, result: any}>('http://localhost:3000/register', authData)
      .subscribe(response => {
        this.userId = response.result._id
        this.login(authData.email, authData.password)
      })
  }

  login(email: string, password: string) {
    this.http.post<{token: string, role: any, expiresIn: number, userId: string }>('http://localhost:3000/login', {email, password})
      .subscribe(response => {
        this.userId = response.userId
        this.token = response.token
        if(this.token) {
          if(response.role[0] === 'admin') {
            this.isAdmin = true
            this.isAdminStatusListener.next(true)
          }
          else {
            this.isAdminStatusListener.next(false)
          }
          const expiresInDuration = response.expiresIn

          this.setAuthTimer(expiresInDuration)

          this.isAuth = true
          this.authStatusListener.next(true)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
          this.saveAuthData(this.token, expirationDate, this.isAdmin.toString(), this.userId)
          this.router.navigate(['products', 'motherboards'])
        }
      })
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getIsAdmin() {
    return this.isAdmin
  }

  getIsAuth() {
    return this.isAuth
  }

  getIsAdminStatusListener() {
    return this.isAdminStatusListener.asObservable()
  }

  logout() {
    this.token = null
    this.isAdmin = false
    this.isAuth = false
    this.authStatusListener.next(false)
    this.isAdminStatusListener.next(false)
    this.router.navigate([''])
    this.clearAuthData()
    clearTimeout(this.tokenTimer)
    localStorage.removeItem('cart')
  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if(!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    if(expiresIn > 0) {
      this.token = authInformation.token
      if(authInformation.isAdmin === 'trueadmin') {
        this.isAdmin = true
        this.isAdminStatusListener.next(true)
      }
      this.isAuth = true
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
      this.userId = authInformation._id
    }
  }

  private saveAuthData(token: string, expirationDate: Date, isAdmin: string, _id: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('_id', _id)
    if(isAdmin === 'false') {
      localStorage.setItem('isAdmin', isAdmin)

    } else {
      localStorage.setItem('isAdmin', isAdmin + 'admin')
    }
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('_id')
  }

  private getAuthData() {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const isAdmin = localStorage.getItem("isAdmin")
    const _id = localStorage.getItem("_id")
    if (!token || !expirationDate) {
      return null
    }
    return {
      _id,
      isAdmin,
      token,
      expirationDate: new Date(expirationDate),
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }


  getItemsInWishList() {
    this.http.get<{wishList: Product[]}>('http://localhost:3000/getWishList/' + this.userId)
      .subscribe(response => {
        this.itemsInWishList = response.wishList
        this.wishListUpdated.next([...this.itemsInWishList])
      })
  }

  getWishListUpdateListener() {
    return this.wishListUpdated.asObservable()
  }

  addToWishList(product: Product){
    if(this.isAuth === false) {
      this.notifyService.showError('Login', 'Please Login First')
      this.router.navigate(['login'])
    } else {
      this.http.post<{message: string, title: string}>('http://localhost:3000/addToWishList/' + this.userId, product)
        .subscribe(response => {
          console.log(response.title)
          if(response.title === 'Success') {
            this.notifyService.showSuccess(response.title, response.message)
          }else if(response.title === 'Error'){
            this.notifyService.showError(response.title, response.message)
          }
        })
    }
  }

  removeItemFromWishList(itemId: string) {
    this.http.delete<{message: string, title: string}>('http://localhost:3000/deleteFromWishList/' + this.userId + '/' + itemId)
      .subscribe(response => {
        this.notifyService.showSuccess(response.title, response.message)
        this.itemsInWishList = this.itemsInWishList.filter(item => item._id !== itemId)
        this.wishListUpdated.next([...this.itemsInWishList])
      })
  }
}
