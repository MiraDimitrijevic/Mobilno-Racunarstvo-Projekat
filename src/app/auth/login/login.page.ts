import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router:Router ,private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  logIn(form:NgForm){
    this.authService.logIn(form.value).subscribe( resData =>{
      console.log("Registracija uspela!");
      console.log(resData);
      this.router.navigateByUrl('my-books/tabs/list');

    } , errRes=> {
      let message= "Incorrect email or password";
      const error= errRes.error.error.message;
      if(error==="EMAIL_NOT_FOUND") message= "Incorrect email!";
      else if(error=== "INVALID_PASSWORD") message="Incorrect password";
      this.alertCtrl.create({
        header: "Authentication failed!",
         message,
        buttons: ['OK']
      }).then((alert)=> {
        alert.present();
      }
      );
      
    });
  }

  openRegistrationPage(){
    this.router.navigateByUrl('register');

  }

}
