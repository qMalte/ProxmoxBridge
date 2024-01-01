import {Component, ErrorHandler} from '@angular/core';
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {environment} from "../app.config";
import {catchError, TeardownLogic, throwError} from "rxjs";

@Component({
  selector: 'app-auth-quarantaine',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './auth-quarantaine.component.html',
  styleUrl: './auth-quarantaine.component.scss'
})
export class AuthQuarantaineComponent {

  alertMessage = '';
  email = '';

  constructor(private http: HttpClient) {
    //
  }

  requestAccess() {
    this.http
      .post(`${environment.apiUrl}/auth/request`,
      {email: this.email})
      .pipe(catchError(err => {
        this.alert(err.error?.description_de);
        return throwError(err.error?.description_de);
      }))
      .subscribe(response => {
        console.log(`${environment.apiUrl}/auth/request -> OK`);
        console.log(response);
      });
  }

  alert(message: string) {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }

}
