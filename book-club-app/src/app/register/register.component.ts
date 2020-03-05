import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(
    public userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log("USER ADDED");
        this.login(form);
      },
      err => {
        if (err.status == 422) {
          this.serverErrorMessages = err.error.join('. ');
        } else {
          this.serverErrorMessages = 'Something went wrong, please contact admin';
        }
      }
    );
  }

  login(form: NgForm) {
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
