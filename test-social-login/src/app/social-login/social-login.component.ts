import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(data => {
      console.log(data);
      this.user = data;
    }).catch(resolve => console.log(resolve));
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      console.log(data);
      this.user = data;
    }).catch(resolve => console.log(resolve));
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
