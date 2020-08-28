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

  private build_user(data) {
    const newUser = new UserDto();
    newUser.userId = data.user.uid;
    newUser.username = data.user.email;
    return newUser;
  }
  async get_favoritos(userId: string): Promise<MovieDto[]> {
    return null;
  }


  async login(username, password) {
    try {
      let _user_data = await firebase.auth().signInWithEmailAndPassword(username, password);
      const user =  this.build_user(_user_data);
      // for simplicity of the exercise ill save the user obj 
      // in production we must not save the current user, 
      // maybe use a session token to validate the user
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
      const user =  this.build_user(_user_data);
      // for simplicity of the exercise ill save the user obj 
      // in production we must not save the current user, 
      // maybe use a session token to validate the user
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

}
