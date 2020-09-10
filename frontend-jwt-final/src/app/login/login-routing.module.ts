import { MemberComponent } from './components/member/member.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const loginRoutes: Routes = [
  // {
  //   path: 'default/admin',
  //   component: AdminComponent
  // },
  // {
  //   path: 'default/member',
  //   component: MemberComponent
  // }

  // {
  //   path: 'register',
  //   component: RegisterComponent
  // }
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
