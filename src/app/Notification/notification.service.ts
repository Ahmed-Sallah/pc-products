import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title){
    this.toastr.success(title, message, {positionClass: 'toast-top-left' });
  }
  showError(message, title){
    this.toastr.error(title, message, {positionClass: 'toast-top-left' });
  }
}
