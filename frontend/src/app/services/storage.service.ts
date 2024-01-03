import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

// interface User {
//     id: number
//   }

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}
  

  currentUser = {}

  public clean() {
    window.sessionStorage.clear();
    this.currentUser = {}
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user.status.data.user));
    this.currentUser = JSON.stringify(user.status.data.user)
  }

  public saveToken(token: any) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token.status.data));
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.currentUser = JSON.parse(user)
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public isEmpty() {
    for(var prop in this.currentUser) {
      if(this.currentUser.hasOwnProperty(prop))
          return false;
    }
    return true;
  }

}