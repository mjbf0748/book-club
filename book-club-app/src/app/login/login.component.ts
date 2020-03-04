import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
    ) { }

  model = {
    email: '',
    password: ''
  }

  serverErrorMessages: string;

  ngOnInit(): void {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/profile');
  }

  Submit(form : NgForm) {
    console.log(form.value);
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/profile')

      },

      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
