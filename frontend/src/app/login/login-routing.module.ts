import { MemberLoginTestComponent } from './components/member-login-test/member-login-test.component';
import { AdminLoginTestComponent } from './components/admin-login-test/admin-login-test.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: 'admin',
    component: AdminLoginTestComponent
  },
  {
    path: 'member',
    component: MemberLoginTestComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
