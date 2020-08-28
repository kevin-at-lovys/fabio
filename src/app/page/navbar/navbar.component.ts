import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/profile/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserObservable.subscribe({
      next: u => this.user = u
  });
}

}
