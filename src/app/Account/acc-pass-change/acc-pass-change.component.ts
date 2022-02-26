import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-acc-pass-change',
  templateUrl: './acc-pass-change.component.html',
  styleUrls: ['./acc-pass-change.component.css']
})
export class AccPassChangeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onChangePass(form: NgForm) {
    this.authService.changePassword(form.value.currentPass, form.value.newPass, form.value.confirmNewPass)
  }

}
