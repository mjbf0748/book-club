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
    notes: ''
  };

  readonly url = environment.baseUrl;

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

  createBook(book: Book) {
    return this.http.post(this.url + '/books/createBook', book);
  }

  updateBook(notes) {
    return this.http.put(this.url + '/books/update', notes);
  }

  deleteBook(book) {
    return this.http.put(this.url + '/books/delete', book);
  }

  searchBooks(search: string) {
    return this.http.get(this.url + '/books/search/' + search);
  }


  setBook(value) {
    this.data = value;
    localStorage.setItem("selectedBook", JSON.stringify(value));
  }

  getBook() {
    console.log(localStorage.getItem("selectedBook"))
    return JSON.parse(localStorage.getItem("selectedBook"));
  }

}
