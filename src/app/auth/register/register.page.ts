import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router:Router, private service:AuthService) { }

  ngOnInit() {
  }

  register(form:NgForm){
    this.service.register(form.value).subscribe( resData =>{
      console.log("Registracija uspela!");
      console.log(resData);
    })
  }

  openLogInPage(){
this.router.navigateByUrl('login');
  }

}
