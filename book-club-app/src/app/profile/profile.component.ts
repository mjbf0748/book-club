import { Component, OnInit } from '@angular/core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import { Book } from '../shared/models/book';
import { BookService } from '../shared/services/book.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  faUserCircle = faUserCircle;
  userDetails;
  userBooks;
  currentBook;
  lastBook;
  nextBook;

  constructor(private userService: UserService, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        this.currentBook = this.userDetails.currentBook;
        this.lastBook = this.userDetails.lastBook;
        this.nextBook = this.userDetails.nextBook;

        this.userBooks = this.userDetails.books;
        this.userBooks.forEach((book) => {
          console.log(book);
        });

      },
      err => {

      }
    );

  }

  editBook(book: Book) {
    this.bookService.setBook(book);
    console.log(book);
    this.router.navigateByUrl('/details');
  }

  complete(current, next) {
    let obj = {
      book: current,
      nextBook: next,
      email: this.userDetails.email
    }

    this.bookService.complete(obj).subscribe(
      res => {
        console.log(res);
        this.refresh();
      },
      err => {}
    )
  }

  refresh() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        this.currentBook = this.userDetails.currentBook;
        this.lastBook = this.userDetails.lastBook;
        this.nextBook = this.userDetails.nextBook;
        this.userBooks = this.userDetails.books;

      },
      err => {

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
