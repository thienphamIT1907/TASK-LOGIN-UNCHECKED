import { JwtService } from './../../services/jwt.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-login-test',
  templateUrl: './admin-login-test.component.html',
  styleUrls: ['./admin-login-test.component.css']
})
export class AdminLoginTestComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  notification: string;
  errorMessage: string;

  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) { }

  ngOnInit(): void {
    this.subscription = this.userService.accessAdminPage().subscribe({
      next: data => {
        console.log(data);
        this.notification = data;
      },
      error: err => {
        this.errorMessage = `Something wrong!: ${JSON.parse(err)}`;
      }
    });
  }

  logout(): void {
    this.jwtService.logOut();
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
