import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })

export class AuthService {

  private authStatusListener = new Subject<boolean>()
  private isAdminStatusListener = new Subject<boolean>()
  private isAdmin = false
  private isAuth = false
  private token: string
  private tokenTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  register(authData: AuthData) {
    this.http.post('http://localhost:3000/register', authData)
      .subscribe(response => {
        this.login(authData.email, authData.password)
      })
  }

  login(email: string, password: string) {
    this.http.post<{token: string, role: any, expiresIn: number }>('http://localhost:3000/login', {email, password})
      .subscribe(response => {
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
          console.log(expirationDate)
          this.saveAuthData(this.token, expirationDate, this.isAdmin.toString())
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
      console.log(this.isAdmin)
      if(authInformation.isAdmin === 'true') {
        this.isAdmin = true
        this.isAdminStatusListener.next(true)
      }
      this.isAuth = true
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  private saveAuthData(token: string, expirationDate: Date, isAdmin: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('isAdmin', isAdmin)
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }

  private getAuthData() {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const isAdmin = localStorage.getItem("isAdmin")
    if (!token || !expirationDate) {
      return null
    }
    return {
      isAdmin,
      token,
      expirationDate: new Date(expirationDate),
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting Timer:" + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }
}
