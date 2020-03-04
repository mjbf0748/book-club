import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';

import {AuthGuard} from '../shared/auth/auth.guard';
import { MyBooksComponent } from '../my-books/my-books.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CreateBookComponent } from '../create-book/create-book.component';

// Routes for navigation
const routes: Routes = [
  {path: 'create', component: CreateBookComponent, canActivate: [AuthGuard]},
  {path: 'details', component: BookDetailsComponent, canActivate: [AuthGuard]},
  {path: 'mybooks', component: MyBooksComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
