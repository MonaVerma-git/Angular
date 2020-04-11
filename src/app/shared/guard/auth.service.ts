import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessTokenId;
  public userData;
  constructor() { 
    this.accessTokenId = localStorage.getItem('accessToken');
    let a = sessionStorage.getItem('UserData');
    this.userData = JSON.parse(a);
  }
  setLocalStorage(data) {   
    localStorage.setItem('accessToken', data.data.token);
    // console.log(data.token);
    // localStorage.setItem('UserData', JSON.stringify(data.data));
    this.accessTokenId = localStorage.getItem('accessToken');
    // let a = localStorage.getItem('UserData');
    // this.userData = JSON.parse(a);
  }
  clearLocalStorage() {
    localStorage.removeItem('accessToken');
  }
}
