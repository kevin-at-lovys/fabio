import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/profile/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  movies;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserObservable.subscribe({
      next: (user) => {
        if (!user)
          this.router.navigateByUrl("/login")
        this.movies = user.favorites;
        console.log(this.movies)
      }
    });
  }

}
