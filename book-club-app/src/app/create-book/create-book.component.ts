import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { BookService } from '../shared/services/book.service';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
  providers: [BookService]
})
export class CreateBookComponent implements OnInit {


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  userEmail: string;
  books: any;
  searchString: string;

  constructor(public bookService: BookService,
    private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.userEmail = res['user'].email;
        console.log(this.userEmail)
      },
      err => {

      }
    );

  }

  onCreate(form: NgForm) {
    this.bookService.createBook(form.value).subscribe(
      res => {
        console.log(res);
        if (JSON.parse(JSON.stringify(res)).message == "Book already added"){
          this._snackBar.open("Book already added", null, {duration: 5000});
        } else {
          this._snackBar.open("Book Added", null, {duration: 5000});
        }
      },
      err => {

      }

    );
    console.log(form.value);
    this._snackBar.open("Book Added", null, {duration: 5000});

  }

  onSearch() {
    this.bookService.searchBooks(this.searchString).subscribe((res) => {
      console.log(res);
      this.books = res;
      console.log(this.books)
    });
   }

   onAdd(title, author, coverUrl) {
    let book = {email: this.userEmail,
    title: title,
    author: author,
    pages: '',
    notes: '',
    coverUrl: coverUrl
    }
    this.bookService.createBook(book).subscribe(
      res => {
        console.log(res);
        this._snackBar.open("Book Added", null, {duration: 5000});
      },
      err => {

      }

    );
     console.log(title, author);
   }
}

