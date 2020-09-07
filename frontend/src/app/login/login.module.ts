import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLoginTestComponent } from './components/admin-login-test/admin-login-test.component';
import { MemberLoginTestComponent } from './components/member-login-test/member-login-test.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';

@NgModule({
  declarations: [
    AdminLoginTestComponent,
    MemberLoginTestComponent,
    AuthLoginComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule
  ],
  exports: [
    AuthLoginComponent
  ]
})
export class LoginModule { }
