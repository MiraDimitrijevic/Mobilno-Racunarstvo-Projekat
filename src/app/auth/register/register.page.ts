import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  register(form:NgForm){
    
  }

  openLogInPage(){
this.router.navigateByUrl('login');
  }

}
