import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtService } from './login/services/jwt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  roles: string[] = [];
  authority: string;

  constructor(
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    if (this.jwtService.getToken()) {
      this.roles = this.jwtService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MEMBER') {
          this.authority = 'member';
          return false;
        }
        this.authority = 'unauthorized';
        return true;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
