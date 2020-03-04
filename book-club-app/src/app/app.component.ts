import { Component, Output } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-club-app';
  @Output() isLoggedIn: boolean = false;

  constructor (public userService: UserService) {
  }

  checkLogIn() {
    this.isLoggedIn = this.userService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

}
