import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../user.model';

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
  public _user= new BehaviorSubject<UserModel | null>(null);
private _isUserAuthenticated=false;
  constructor(private http:HttpClient) { }

  get isUserAuthenticated(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return !!user._token;
     } else return false;
    }));
  }

  get user(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return user;
     } else {
     return null;}
    }));
  }


  get token(){
    return this._user.asObservable().pipe( map( (user) =>{
     if(user) {
      return user._token;
     } else {
     return null;}
    }));
  }

  logIn(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey ,{
      email:user.email,password:user.password, returnSecureToken:true
         }
         ).pipe(tap(  (data) =>{
         const expiresTime= new Date(new Date().getTime() + +data.expiresIn*1000);
         const userLogged= new UserModel(data.localId , 
          data.email, user.password, data.idToken, expiresTime );
          this._user.next(userLogged);
          console.log("User token pri loginu: "+ userLogged._token);
          console.log("User id "+ userLogged.id);
          console.log("User email "+ userLogged.email);
          console.log("User password "+ userLogged.password);
         }

         ));
  }

  logOut(){
    this._user.next(null);
  }

  register(user:UserData){
    this._isUserAuthenticated=true;
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey ,{
 email:user.email,password:user.password, name: user.name, surname: user.surname,returnSecureToken:true
    }
    ).pipe(tap(  (data) =>{
      const expiresTime= new Date(new Date().getTime() + +data.expiresIn*1000);
      const userRegistered= new UserModel(data.localId ,
       data.email, user.password, data.idToken, expiresTime );
       this._user.next(userRegistered);
      }

      ));
  }
}
