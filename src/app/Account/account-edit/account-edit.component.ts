import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { UserData } from "../userData.model";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class EditAccountComponent implements OnInit{

  userData: UserData

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserData()
      .subscribe(response => {
        this.userData = response.userData
      })
  }

  onEdit(form: NgForm) {
    const editedData: UserData = {firstName: form.value.firstName, lastName: form.value.lastName, email: form.value.email, phone: form.value.phone}
    this.authService.editAccount(editedData)
  }
}
