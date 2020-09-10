import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.accessAdminPage().subscribe({
      next: data => {
        this.data = data;
      },
      error: err => {
        console.log(err);
        // alert('Sorry! You need to login!');
      }
    });
  }
}
