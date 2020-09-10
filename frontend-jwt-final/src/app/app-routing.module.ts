import { MemberComponent } from './login/components/member/member.component';
import { AdminComponent } from './login/components/admin/admin.component';
import { AuthLoginComponent } from './login/components/auth-login/auth-login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: AuthLoginComponent
  //   // loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // }
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'member',
    component: MemberComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
