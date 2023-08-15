import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  logIn(form:NgForm){
    this.authService.logIn();
    this.router.navigateByUrl('my-books/tabs/list');
  }

  openRegistrationPage(){
    this.router.navigateByUrl('register');

  }

}
