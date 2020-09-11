import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-social-login';

  // user: SocialUser;
  // loggedIn: boolean;

  // constructor(private socialAuthService: SocialAuthService) { }

  // ngOnInit(): void {
  //   this.socialAuthService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //   });
  // }

  // signInWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //   .then(data => {
  //     console.log(data);
  //     this.user = data;
  //   }).catch(resolve => console.log(resolve));
  // }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  //   .then(data => {
  //     console.log(data);
  //     this.user = data;
  //   })
  //   .catch(resolve => console.log(resolve));
  // }

  // signOut(): void {
  //   this.socialAuthService.signOut();
  // }
}
