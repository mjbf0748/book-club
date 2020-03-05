import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  userDetails;
  userEmail;
  selectedBook;
  statuses = ["Current", "Next"];
  status;
  current: Boolean;
  next: Boolean;
  last: Boolean;

  constructor(private userService: UserService, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.selectedBook = this.bookService.getBook();
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        this.userEmail = this.userDetails.email;
        console.log(this.userDetails);
        this.current = this.userDetails.currentBook.title == this.selectedBook.title;
        this.next = this.userDetails.nextBook.title == this.selectedBook.title;
        this.last = this.userDetails.lastBook.title == this.selectedBook.title;

        if (this.current) {
          this.status = 'Current';
        }

        if (this.next) {
          this.status = 'Next';
        }
      },
      err => {

      }
    );

  }

  onUpdate(book) {
    console.log(book);
    let obj = {
      email: this.userEmail,
      book: book
    }
    this.bookService.updateBook(obj).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    if (this.status == 'Current' || this.current) {
      this.bookService.updateCurrent(obj).subscribe(
        res => {
          console.log(res);
        },
        err => {

        }
      );
    }

    if (this.status == 'Next' || this.next) {
      this.bookService.updateNext(obj).subscribe(
        res => {
          console.log(res);
        },
        err => {

        }
      );
    }


  }

  onDelete(book) {
    if (confirm('Are you sure you want to delete this book?') == true) {
      let obj = {
        email: this.userEmail,
        title: book.title,

      }
      this.bookService.deleteBook(obj).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );

      if (this.last) {
        this.bookService.deleteLast(obj).subscribe(
          res => {
            console.log(res);
          },
          err => {

          }
        );
      }

      if (this.current) {
        this.bookService.deleteCurrent(obj).subscribe(
          res => {
            console.log(res);
          },
          err => {
          }
        );
      }

      if (this.next) {
        this.bookService.deleteNext(obj).subscribe(
          res => {
            console.log(res);
          },
          err => {

          }
        );
      }



      this.router.navigateByUrl('/mybooks');

    }
  }

  clear() {

    this.status = null;
  }

}
