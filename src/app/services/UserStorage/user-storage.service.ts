import { Injectable } from '@angular/core';
import { USER } from '../auth/auth.service';
const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  static USER:any
  constructor() { }

  public saveToken(token:string):void {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN,token);
}

public saveUser(user:USER):void {
 localStorage.removeItem(USER);
  localStorage.setItem(USER,JSON.stringify(user)); 
}

static getToken():string{
  return localStorage.getItem(TOKEN);
}

static getUser():string {
  console.log(localStorage.getItem(USER));
  return  localStorage.getItem(USER);
}

static getUserId():number{
  const user =(JSON).parse(this.getUser());
  console.log(user);
  if(user==null)
    return 0;
  return user.id;
}

static getUserRole():any{
  let user = JSON.parse(this.getUser());
  if(user == null)
    return '';
  return user.roles[0];
}

static isAdminLoggined():boolean{
  if(this.getToken() == null)
    return false;
  const role : any = this.getUserRole();
 return role.name ==='ADMIN' ;
}

static isCustomerLoggined():boolean{
  if(this.getToken() == null)
    return false;
  const role : any = this.getUserRole();
  return role.name === 'CUSTOMER';
}

static signout():void{
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
}

}
