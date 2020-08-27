import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { MovieDto } from '../models/movie-dto';
import { UserDto } from '../models/user-dto';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUser: Observable<UserDto>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    firebase.initializeApp(environment.firebaseConfig)
    console.log(this.get_user())
  }

  get_user() { return this.currentUserSubject.value }

  has_movie_favorite(movie: MovieDto): boolean {
    const user = this.get_user();
    if (user == null) return false;
    if (!user.favorites || user.favorites.length == 0) return false;
    return user.favorites.filter(o => o.id === movie.id).length > 0;
  }
  private async build_user(data) {
    const newUser = new UserDto();
    newUser.userId = data.user.uid;
    newUser.username = data.user.email;
    newUser.favorites = await this.get_favoritos(newUser.userId);
    return newUser;
  }
  async get_favoritos(userId: string): Promise<MovieDto[]> {
    return null;
  }


  async login(username, password) {
    try {
      let _user_data = await firebase.auth().signInWithEmailAndPassword(username, password);
      const user = await this.build_user(_user_data);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    } catch (ex) {
      console.error(ex);
      return ex;
    }

  }
  async register(username, password) {
    try {
      let _user_data = await firebase.auth().createUserWithEmailAndPassword(username, password);
      const user = await this.build_user(_user_data);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return _user_data;
    } catch (ex) {
      console.error(ex);
      return ex;
    }
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  toggle_movie_favorite(movie: MovieDto) {

  }
}
