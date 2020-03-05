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

  // Specify what routes do not need authorization
  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  // Create a user when they register
  postUser(user: User) {
    return this.http.post(environment.baseUrl + '/auth/register',user, this.noAuthHeader);
  }

  // Login a user
  login(authCredentials) {
    return this.http.post(environment.baseUrl + '/auth/authenticate', authCredentials, this.noAuthHeader);
  }

  // Fetch user data
  getUserProfile() {
    return this.http.get(environment.baseUrl + '/auth/userProfile');
  }

  // Get JWT Token
  getToken() {
    return localStorage.getItem('token');
  }

  // Set JWT Token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Delete JWT Token
  deleteToken() {
    localStorage.removeItem('token');
  }

  // Use Token to parse payload
  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  //Check if user is logged in
  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else
        return false;
  }

}
