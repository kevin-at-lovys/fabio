import { Component, OnInit } from '@angular/core';


import { UserService } from 'src/app/profile/user.service';
import { UserDto } from 'src/app/models/user-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : UserDto;
  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserObservable.subscribe({
      next:(user) => this.user = user
    })
  }
  logout(){
    this.userService.logout();
  }

}
