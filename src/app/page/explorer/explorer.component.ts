import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie/movie.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationService } from '../pagination/pagination.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  categories: any;
  trends: any;
  selectedPage: number;
  page = "1";

  constructor(
    private movieService: MovieService,
    private paginationService: PaginationService) {

    this.paginationService.currentPageObservable.subscribe({
      next: (page) => {
        this.page = page;
        this.update_trends(page);
      }
    });
  }

  ngOnInit(): void {
    this.categories = this.movieService.get_movie_categories();
  }
  update_trends(page?) {
    this.movieService.get_last_trends(null, page || this.page)
      .then(data => {
        this.paginationService.total_pages = data.total_pages;
        this.trends = data.movies;
      });
  }

}
