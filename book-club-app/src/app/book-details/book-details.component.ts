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

  constructor(private userService: UserService, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.selectedBook = this.bookService.getBook();
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        this.userEmail = this.userDetails.email;
        console.log(this.userDetails);
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
  }

  onDelete(book) {
    if (confirm('Are yoou ure you want to delete this book?') == true) {
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

      this.router.navigateByUrl('/mybooks');

    }
  }

}
