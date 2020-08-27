import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { MovieDto } from '../../models/movie-dto';
import {UserService} from "../../profile/user.service";


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: MovieDto

  constructor(private _elmRef: ElementRef, private userService : UserService) { }

  ngOnInit(): void {
    this.movie.favorite = this.userService.has_movie_favorite(this.movie);
    this.update_ui_element();
  }
  toggle_favorite() {
    this.movie.favorite = !this.movie.favorite;
    this.userService.toggle_movie_favorite(this.movie);
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
  private toggle_favorite_animation(run :boolean){
    let elm = this._elmRef.nativeElement.querySelector(".favorite");
    if (this.movie.favorite) {
      elm.classList.add("spin");
    } else {
      elm.classList.remove("spin");
    }
  }

}
