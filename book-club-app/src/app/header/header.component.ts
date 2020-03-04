import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  value = false;

  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn()
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  login(val) {

    this.value = true;
    console.log(this.value)
  }
}
