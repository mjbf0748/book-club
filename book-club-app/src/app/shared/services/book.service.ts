import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private data = {};
  userEmail: string;
  selectedBook: Book = {
    email: this.userEmail,
    title: '',
    author: '',
    pages: '',
    notes: '',
    coverUrl: ''
  };

  url = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getUserProfile().subscribe(
    res => {
      console.log(res);
      this.userEmail = res['user'].email;
      console.log(this.userEmail);
    },
    err => {

    }
  );
}

  // Create a book
  createBook(book: Book) {
    return this.http.post(this.url + '/books/createBook', book);
  }

  // Update a user's notes
  updateBook(notes) {
    return this.http.put(this.url + '/books/update', notes);
  }

  // Update current book
  updateCurrent(book) {
    return this.http.put(this.url + '/books/updateCurrent', book);
  }

  //Update next book
  updateNext(book) {
    return this.http.put(this.url + '/books/updateNext', book);
  }

  // Delete a book
  deleteBook(book) {
    return this.http.put(this.url + '/books/delete', book);
  }

  // Delete user's last book
  deleteLast(book) {
    return this.http.put(this.url + '/books/deleteLast', book);
  }

  // Delete current book
  deleteCurrent(book) {
    return this.http.put(this.url + '/books/deleteCurrent', book);
  }

  // Delete next book
  deleteNext(book) {
    return this.http.put(this.url + '/books/deleteNext', book);
  }

  // Complete book that is set to current
  complete(book) {
    return this.http.put(this.url + '/books/complete', book);
  }

  // Search for a book using book api
  searchBooks(search: string) {
    return this.http.get(this.url + '/books/search/' + search);
  }

  // Set a book to local.storage
  setBook(value) {
    this.data = value;
    localStorage.setItem("selectedBook", JSON.stringify(value));
  }

  // Fetch book from local.storage
  getBook() {
    console.log(localStorage.getItem("selectedBook"))
    return JSON.parse(localStorage.getItem("selectedBook"));
  }

}
