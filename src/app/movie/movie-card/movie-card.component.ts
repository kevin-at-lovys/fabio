import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { MovieDto } from '../../models/movie-dto';
import { UserService } from "../../profile/user.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: MovieDto

  constructor(private _elmRef: ElementRef, private userService: UserService,
    private router: Router) {


  }

  ngOnInit(): void {
    this.update_ui_element();
    this.userService.currentUserObservable.subscribe({
      next: user => {
        if (user && this.movie) {
          this.movie.favorite = this.userService.has_favorite_movie(this.movie);
          this.update_ui_element();
        } else {
          this.movie.favorite = false;
        }
      },
      error(msg) {
        console.log(msg);
      }
    });
  }
  toggle_favorite() {
    if (!this.userService.get_user()) {
      this.router.navigateByUrl("/login");
      return;
    }
    this.toggle_favorite_animation(true);

    this.movie.favorite = !this.movie.favorite;

 

    if (this.movie.favorite) {
      this.userService.add_favorite_movie(this.movie)
        .then(e => this.toggle_favorite_animation(false));
    }
    else {
      this.userService.remove_favorite_movie(this.movie)
        .then(e => this.toggle_favorite_animation(false));;
    }

    this.update_ui_element();
  }
  private update_ui_element() {
    let elm = this._elmRef.nativeElement.querySelector(".favorite");
    if (this.movie.favorite) {
      elm.classList.add("active");
    } else {
      elm.classList.remove("active");
    }
  }
  private toggle_favorite_animation(run: boolean) {
    let elm = this._elmRef.nativeElement.querySelector(".favorite");
    if (this.movie.favorite) {
      elm.classList.add("spin");
    } else {
      elm.classList.remove("spin");
    }
  }

}
