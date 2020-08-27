import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from "rxjs";

import { MovieDto } from '../models/movie-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_KEY = "0f60ad592a39d4b497a0d8889bba1be2";

  private endPoints = {
    moviesGenres: "https://api.themoviedb.org/3/genre/movie/list?api_key=[API_KEY]&language=[API_LANG]",
    moviesByDiscobery: "https://api.themoviedb.org/3/discover/movie?api_key=[API_KEY]&language=[API_LANG]&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878",
    moviesSearch: "https://api.themoviedb.org/3/search/movie?api_key=[api_key]&language=en-US&query=[QUERY]page=[PAGE]include_adult=false",
    lastTrends: "https://api.themoviedb.org/3/trending/movie/week?api_key=[API_KEY]",
    configuration: "",
    images: "https://image.tmdb.org/t/p/w500"
  };
  private acceptedLanguages = ["en-US", "pt-PT"]

  constructor(private http: HttpClient) { }

  private prepare_url(url: string, lang?: string): string {
    if (!lang || this.acceptedLanguages.indexOf(lang) == -1)
      lang = this.acceptedLanguages[0];

    return url.replace("[API_KEY]", this.API_KEY).replace("[API_LANG]", lang);
  }

  async get_last_trends(lang: string = "en-US") {

    const _url = this.prepare_url(this.endPoints.lastTrends, lang);
    const movies = [];
    const data = await this.http.get<any>(_url).toPromise();
    if (data.results) {
      for (let result of data.results) {
        movies.push(this.createMovie(result));
      }
    }
    return movies;
  }
  private createMovie(result: any) {
    let movieDto = new MovieDto();

    movieDto.overview = result.overview;
    movieDto.popularity = result.popularity;
    movieDto.title = result.title;
    movieDto.thumbnailImage = this.endPoints.images + result.backdrop_path;
    return movieDto;
  }

  async get_movie_categories(lang?: string): Promise<{ id_number, name: string }[]> {
    const _url = this.prepare_url(this.endPoints.moviesGenres, lang);
    let data;
    try {
      data = await this.http.get<any>(_url).toPromise();
    } catch (ex) {
      console.error(ex);
    }
    return data.genres || [];
  }
  async get_movies_by_genre(genre: string, lang?: string) {
    const _url = this.prepare_url(this.endPoints.moviesByDiscobery, lang);
    let data;
    try {
      data = await this.http.get<any>(_url).toPromise();
    } catch (ex) {
      console.error(ex);
    }
    return data.movies || [];
  }

}
