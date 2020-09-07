import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-member-login-test',
  templateUrl: './member-login-test.component.html',
  styleUrls: ['./member-login-test.component.css']
})
export class MemberLoginTestComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  notification: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.accessMemberPage().subscribe({
      next: data => this.notification = data,
      error: err => {
        this.errorMessage = `Something wrong!: ${JSON.parse(err)}`;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
