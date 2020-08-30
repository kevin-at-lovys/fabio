import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgModel } from '@angular/forms';

import { MovieDto } from '../models/movie-dto';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUserObservable: Observable<UserDto>;

  private showFormSubject: BehaviorSubject<boolean>;;
  public showFormObservable: Observable<boolean>;



  public b = true;
  constructor() {
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObservable = this.currentUserSubject.asObservable();
    firebase.initializeApp(environment.firebaseConfig)
    if (this.get_user()) {
      let user = this.get_user();
      this.get_favorites(user.userId).then(favs => user.favorites = favs)
    }

    this.showFormSubject = new BehaviorSubject<boolean>(false);
    this.showFormObservable = this.showFormSubject.asObservable();
  }

  get_user() { return this.currentUserSubject.value }

  private async build_user(data) {
    const newUser = new UserDto();
    newUser.userId = data.user.uid;
    newUser.username = data.user.email;
    newUser.favorites = await this.get_favorites(newUser.userId);
    return newUser;
  }

  save_local_user(user : UserDto) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  async login(username, password) {
    try {
      let _user_data = await firebase.auth().signInWithEmailAndPassword(username, password);
      const user = await this.build_user(_user_data);
      // for simplicity of the exercise ill save the user obj 
      // in production we must not save the current user, 
      // maybe use a session token to validate the user
      this.save_local_user(user);
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
      // for simplicity of the exercise ill save the user obj 
      // in production we must not save the current user, 
      // maybe use a session token to validate the user
      this.save_local_user(user);
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
  requestUserLogin() {
    this.showFormSubject.next(true);
  }
  async remove_favorite_movie(movie: MovieDto) {
    const user = this.get_user();
    const ref = await firebase.database().ref(`favorites/${user.userId}/${movie.id}`);
    try {
      let res = await ref.remove();
      user.favorites = await this.get_favorites(user.userId);
      this.save_local_user(user);
      return res;
    } catch (ex) {
      console.error(ex);
    }
  }
  async add_favorite_movie(movie: MovieDto) {
    const user = this.get_user();
    let res = await firebase.database().ref(`favorites/${user.userId}/${movie.id}`).set(movie);
    user.favorites = await this.get_favorites(user.userId);
    this.save_local_user(user);
    return res
  }

  has_favorite_movie(movie: MovieDto) {
    const user = this.get_user();
    if (user && user.favorites) {
      for (let mv of user.favorites) {
        if (mv.id == movie.id)
          return true;
      }
    }
    return false;
  }
  private async get_favorites(userID) {
    try {

      const ref = await firebase.database().ref(`favorites/${userID}`).once('value');
      const idMovieObjects = ref.val();
      if (!idMovieObjects)
        return [];
      const result = [];
      for (let mv of Object.values(idMovieObjects)) {
        result.push(mv);
      }
      return result;
    } catch (ex) {
      console.error(ex);
      return [];
    }
  }

}
