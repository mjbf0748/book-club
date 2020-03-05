import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  // Identify what pages can be navigated to and set Token
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('NoAuth'))
      return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
      });

    return next.handle(clonedreq).pipe(
      tap(
        event => { },
        err => {
          if (err.error.auth == false) {
            this.router.navigateByUrl('/login');
          }
        })
    );
    }
  }
}
