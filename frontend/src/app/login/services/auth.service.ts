import { LoginInfo } from './../models/login-info';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/jwt-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_LOGIN_API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  authLogin(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.AUTH_LOGIN_API, loginInfo, httpOptions);
  }
}
