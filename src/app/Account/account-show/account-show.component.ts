import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { UserData } from "../userData.model";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-show.component.html',
  styleUrls: ['./account-show.component.css']
})
export class ShowAccountComponent implements OnInit{
  userData: UserData

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData()
      .subscribe(response => {
        this.userData = response.userData
      })
  }
}
