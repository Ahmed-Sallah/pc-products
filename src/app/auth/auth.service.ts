import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })



export class AuthService {

  constructor(private http: HttpClient) {}

  register(authData: AuthData) {
    this.http.post('http://localhost:3000/register', authData)
      .subscribe(response => {
        console.log(response)
      })
  }

  login(email: string, password: string) {
    this.http.post('http://localhost:3000/login', {email, password})
      .subscribe(response => {
        console.log(response)
      })
  }
}
