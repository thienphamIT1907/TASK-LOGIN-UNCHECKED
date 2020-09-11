import { JwtService } from './../../services/jwt.service';
import { AuthService } from './../../services/auth.service';
import { LoginInfo } from './../../models/login-info';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {

    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    console.log('TEST INFORMATION');
    console.log(this.loginForm.get('username'));
    console.log(this.loginForm.get('password'));

    this.subscription = this.authService.authLogin(this.loginInfo).subscribe({
      next: data => {
        console.log(data);
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
      },
      error: err => console.log(`ERROR: ${err}`)
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
}
