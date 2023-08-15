import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _isUserAuthentificated=false;
  constructor() { }

  get isUserAuthentificated():boolean{
    return this._isUserAuthentificated;
  }

  logIn(){
    this._isUserAuthentificated=true;
  }

  logOut(){
    this._isUserAuthentificated=false;
  }
}
