import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from "rxjs";

import { MovieDto } from '../models/movie-dto';
import { HttpClient } from '@angular/common/http';
import { utf8Encode } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_KEY = "0f60ad592a39d4b497a0d8889bba1be2";

  private endPoints = {
    moviesGenres: "https://api.themoviedb.org/3/genre/movie/list?api_key=[API_KEY]&language=[API_LANG]",
    moviesByDiscobery: "https://api.themoviedb.org/3/discover/movie?api_key=[API_KEY]&page=[PAGE]&language=[API_LANG]&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=[GENRE]",
    moviesSearch: "https://api.themoviedb.org/3/search/movie?api_key=[api_key]&page=[PAGE]&language=[API_LANG]&query=[QUERY]page=[PAGE]include_adult=false",
    lastTrends: "https://api.themoviedb.org/3/trending/movie/week?api_key=[API_KEY]&page=[PAGE]",
    configuration: "",
    images: "https://image.tmdb.org/t/p/w500"
  };
  private acceptedLanguages = ["en-US", "pt-PT"]

  constructor(private http: HttpClient) { }

  private prepare_url(url: string, lang?: string, page?: string): string {

    if (!lang || this.acceptedLanguages.indexOf(lang) == -1)
      lang = this.acceptedLanguages[0];
    if (!page)
      page = "1"

    return url
      .replace("[API_KEY]", this.API_KEY)
      .replace("[PAGE]", page)
      .replace("[API_LANG]", lang)
      ;
  }

  async get_last_trends(lang?: string, page?: string) {

    const _url = this.prepare_url(this.endPoints.lastTrends, lang, page);
    const movies = [];
    const data = await this.http.get<any>(_url).toPromise();
    if (data.results) {
      for (let result of data.results) {
        movies.push(this.createMovie(result));
      }
    }
    delete data.results;
    data.movies = movies;
    return data;
  }

  private createMovie(result: any) {
    let movieDto = new MovieDto();

    movieDto.id = result.id;
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
  async get_movies_by_genre(genre: string, lang?: string, page?: string) {

    let _url = this.prepare_url(this.endPoints.moviesByDiscobery, lang, page);
     _url = _url.replace("[GENRE]", genre);
    const movies = [];
    let data; 
    try {
      data = await this.http.get<any>(_url).toPromise();
      if (data.results) {
        for (let result of data.results) {
          movies.push(this.createMovie(result));
        }
      }
    } catch (ex) {
      console.error(ex);
    }
    delete data.results;
    data.name = await this.get_genre_name(+genre);
    data.movies = movies;
    return data;
  }
  async get_genre_name(searchid: number): Promise<string> {
    let cats: any = await this.get_movie_categories()
    let result;
    for (let c of cats) {
      if (c.id == searchid) {
        result = c.name;
        break;
      }
    }
    return result || "Not found";
  }


}
