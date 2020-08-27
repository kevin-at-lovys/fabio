import { Component, OnInit, Input } from '@angular/core';
import { MovieDto } from '../../models/movie-dto';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: MovieDto

  constructor() { }

  ngOnInit(): void {
  }

}
