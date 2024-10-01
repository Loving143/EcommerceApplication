import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../UserStorage/user-storage.service';

const BASIC_URL ="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userStorageService : UserStorageService) { }
  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "register",signupRequest,{ responseType: 'text' });

  }
  login(username:string , password : string , email:string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const body = {username , password,email};
    return this.http.post (BASIC_URL+'api/auth/login',body, {headers, observe:'response',responseType:'text'}).pipe(
      map((res)=>{
        // const token = res.headers.get('authorization').substring(7); 
        // const user = res.body;
        // if(token && user){ 
        //   this.userStorageService.saveToken(token);
        //   this.userStorageService.saveUser(user); 
        console.log("This is ");
          return true;
        
        // return false;
      })
    )
  }

  verifyOtp(username:string,otp:string):any{
    const body = {username , otp};
    return this.http.post(BASIC_URL+'api/auth/verify-otp',body,{responseType:'text'})
  }

  //set token in the local storage 
  public loginUser(token){
    localStorage.setItem("token",token);
    return true;
  }

  // Is login 
  public isLoggined(){
    let tokenStr= localStorage.getItem("toke");
    if(tokenStr==null || tokenStr ==undefined || tokenStr ==''){
      return false;
    }
    else
    return true;
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    localStorage.getItem('token');
  }

  public SetUser(user){
    localStorage.setItem('user',JSON.stringify(user));
  }


}
