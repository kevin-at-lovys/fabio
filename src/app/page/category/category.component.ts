import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MovieDto } from 'src/app/models/movie-dto';
import { MovieService } from 'src/app/movie/movie.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private sub;

  search: string;
  search_name: string;
  movies;
  pagination = {
    total: 10,
    current: 0
  };


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.search = params['name']
    });
    let r = this.movieService.get_movies_by_genre(this.search);
    r.then(e => this.movies = e.movies)
    this.movieService.get_genre_name(+this.search).then(name => this.search_name = name)

  }
  private create_pagination_object() {

  }

}
