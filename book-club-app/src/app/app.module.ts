import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';

// Bootstrap
import {MDBBootstrapModule} from 'angular-bootstrap-md';

// Routing
import {AppRoutingModule} from './app-routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './create-book/create-book.component';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// AuthGuard amd Interceptor for authorization
import {AuthGuard} from './shared/auth/auth.guard';
import { AuthInterceptor } from './shared/auth/auth.interceptor';

//Pipe
import {FilterPipe} from './shared/pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MyBooksComponent,
    BookDetailsComponent,
    CreateBookComponent,
    FilterPipe
  ],
  entryComponents: [CreateBookComponent],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    FontAwesomeModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
