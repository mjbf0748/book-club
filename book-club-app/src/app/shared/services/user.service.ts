import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Initialize user object
  selectedUser: User = {
    _id: '',
    fullName: '',
    email: '',
    password: ''
  }

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.baseUrl + '/auth/register',user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.baseUrl + '/auth/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.baseUrl + '/auth/userProfile');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else
        return false;
  }

}
