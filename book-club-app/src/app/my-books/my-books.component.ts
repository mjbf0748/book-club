import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { CreateBookComponent } from '../create-book/create-book.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from '../shared/services/book.service';
import { Book } from '../shared/models/book';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FilterPipe} from '../shared/pipes/filter.pipe';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  userDetails;
  userBooks: Book[];
  searchTitle = '';
  searchAuthor = '';

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private bookService: BookService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        console.log(this.userDetails);
        this.userBooks = this.userDetails.books;
        console.log(this.userBooks)
      },
      err => {

      }
    );
  }

  onAdd() {
    var dialogRef = this.dialog.open(CreateBookComponent, {
      height: '600px',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('DIALOG CLOSED');
      this.refreshBooks();
    });
  }



  editBook(book) {
    this.bookService.setBook(book);
    console.log(book);
    this.router.navigateByUrl('/details');
  }

  refreshBooks() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userDetails = res['user'];
        console.log(this.userDetails);
        this.userBooks = this.userDetails.books;
        console.log(this.userBooks)
      },
      err => {

      }
    );
  }

}
