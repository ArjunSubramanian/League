import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EqualValidatorDirective } from './shared/equal-validator.directive';

import { UserService } from './user.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
