import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth/auth.service';
import { UserStorageService } from '../services/UserStorage/user-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otpRes:LoginResponse;
  otpForm !: FormGroup
  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : AuthService,
    private router : Router,
    private userStorageService : UserStorageService,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      username : [null, [Validators.required]],
      otp : [null, [Validators.required]]
      
  })
}

  onSubmit():void {
    const username = this.otpForm.get('username')!.value;
    const otp = this.otpForm.get('otp')!.value;

    this.authService.verifyOtp(username, otp).subscribe(
      (res:LoginResponse)=>{
        this.otpRes = res;
        this.snackbar.open('OTP verify successfully','OK', {duration:5000},);
        this.userStorageService.saveToken(this.otpRes.token)
        this.userStorageService.saveUser(this.otpRes.user);
        if(UserStorageService.isAdminLoggined()){
          this.router.navigateByUrl('admin/dashboard');
        }
        else if(UserStorageService.isCustomerLoggined())
          this.router.navigateByUrl('customer/dashboard');
      },
      (error) =>{
        this.snackbar.open('Unable to send OTP .Please check the credentials', 'Error', {duration : 5000})
      }
    )
  }

}
