import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { NotificationService } from "./Notification/notification.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notify: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage =  'An Unknown Error Occurred!'
        if(error.error.message) {
          errorMessage = error.error.message
        }
        this.notify.showError('Error!', errorMessage)
        return throwError(error)
      })
    )
  }
}
