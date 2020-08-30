import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MovieDto } from 'src/app/models/movie-dto';
import { MovieService } from 'src/app/movie/movie.service';
import { PaginationService } from '../pagination/pagination.service';

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
  page;


  constructor(
    private movieService: MovieService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.search = params['name']
    });
    this.paginationService.currentPageObservable.subscribe({
      next: (page) => {
        this.page = page;
        this.update_movies()
      }
    });
    this.update_movies()
  }
  private update_movies() {
    this.set_loading(true);
    document.getElementById("back-button").scrollIntoView({
      behavior: "smooth",
      block: "end"
    })
    this.movieService.get_movies_by_genre(this.search, null, this.page)
      .then(e => {
        this.movies = e.movies;
        this.paginationService.set_total_pages(e.total_pages);
        this.search_name = e.name;
        this.set_loading(false);
        console.log(e)

      });
  }

  set_loading(loading) {
    if (loading) {
      document.getElementById("movie-grid").classList.add("loading");
    } else {
      document.getElementById("movie-grid").classList.remove("loading");
    }

  }
}
