import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface UserData{
  name:string;
  surname:string;
  email:string;
  password:string;
}

interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  localId:string;
  expiresIn:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _isUserAuthentificated=false;
  constructor(private http:HttpClient) { }

  get isUserAuthentificated():boolean{
    return this._isUserAuthentificated;
  }

  logIn(){
    this._isUserAuthentificated=true;
  }

  logOut(){
    this._isUserAuthentificated=false;
  }

  register(user:UserData){
    this._isUserAuthentificated=true;
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey ,{
 email:user.email,password:user.password, name: user.name, surname: user.surname,returnSecureToken:true
    }
    );
  }
}
