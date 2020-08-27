import { Injectable } from '@angular/core';
import { MovieDto } from '../models/movie-dto';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  get_all(): { meta: { page: number, maxPages: number }, movies: MovieDto[] } {

    return null;
  }
  get_by_category(): { meta: { page: number, maxPages: number }, movies: MovieDto[] } {

    return null;
  }
}
