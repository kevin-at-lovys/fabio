import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movie/movie.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  categories: any;
  trends : any;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.categories = this.movieService.get_movie_categories();
    this.trends = this.movieService.get_last_trends();
    console.log(this.trends)
  }

}
