import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginInfo } from './../../models/login-info';
import { AuthService } from './../../services/auth.service';
import { JwtService } from './../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;

  isLoggedIn = false;
  isLogInFailed = false;

  roles: string[] = [];
  username: string;
  authority: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (this.jwtService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.jwtService.getUsername();
      this.roles = this.jwtService.getAuthorities();

      // Handling authorities granted
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MEMBER') {
          this.authority = 'member';
          return false;
        }
        return true;
      });
    }
  }

  onLogin(): void {
    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    this.subscription = this.authService.authLogin(this.loginInfo).subscribe({
      next: data => {
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: (err) => {
        // console.error(err);
        this.isLogInFailed = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  valid(field: string, errorCode: string): boolean {
    return (
      this.loginForm.get(field).hasError(errorCode) &&
      this.loginForm.get(field).touched
    );
  }

  logOut(): void {
    this.jwtService.logOut();
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.href = '';
  }
}
