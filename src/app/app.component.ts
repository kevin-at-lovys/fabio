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
     } 

}
 