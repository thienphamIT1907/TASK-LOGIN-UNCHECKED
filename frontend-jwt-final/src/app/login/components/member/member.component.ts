import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  data: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.accessMemberPage().subscribe({
      next: data => this.data = data,
      error: err => {
        console.log(err);
        // alert('Sorry! You need to login!');
      }
    });
  }

}
