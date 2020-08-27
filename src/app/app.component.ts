import { Component } from '@angular/core';
import { MovieService } from './movie/movie.service';
import { UserService } from './profile/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'MovieSearch';
  movies :any = { meta: {}, movies: [] };
  constructor(
    private userService : UserService
  ) {
    //this.movieService.get_last_trends().then(_movies => this.movies = _movies);
    //this.userService.login("f.almeida.work@gmail.com","teste3").then(data => console.log(data)).catch(err=> console.log(err))
  }

}
 