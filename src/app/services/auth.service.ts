import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public loginWithUsernameAndPassword(loginFormData:any) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: loginFormData.username,
      password: loginFormData.password,
    };
    
    return lastValueFrom(this.http.post(url, body));
  }

  public registerWithUsernameAndPassword(
    registerFormData:any
  ) {
    const url = environment.baseUrl + '/register/';
    const body = {
      username: registerFormData.username,
      email: registerFormData.email,
      first_name: registerFormData.first_name,
      last_name: registerFormData.last_name,
      password: registerFormData.password,
    };

    return lastValueFrom(this.http.post(url, body));
  }

  public requestPasswordReset(emailData:string) {
    const url = environment.baseUrl + '/password-reset/';
    const body = {
      email: emailData,
    };
      
    return lastValueFrom(this.http.post(url, body));
  }

  public activateAccount(uidb64: string, token: string) {
    const url = environment.baseUrl + `/activate/${uidb64}/${token}/`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Activation failed', error);
        return throwError(error);
      })
    );
  }

  public updatePassword(uidb64: string, token: string, password: string) {
    const url = environment.baseUrl + `/reset-password/${uidb64}/${token}/`;
    
    const body = {
      new_password: password,
      confirm_password: password
    };

    console.log(url, body);
    
      
    return lastValueFrom(this.http.post(url, body));
  }

}
