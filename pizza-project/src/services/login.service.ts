import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userName: string = 'admin';
  private userPassword: string = 'admin';

  constructor() { }

  checkAdminData(name: string, password: string) {
    if(this.userName === name && this.userPassword === password){
      sessionStorage.setItem('isUserLoggedIn', 'true');
      return true;
    }
    return;
  }

  get isUserLogged() {
    return sessionStorage.getItem('isUserLoggedIn') !== null;
  }
}
