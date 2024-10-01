import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otpForm !: FormGroup
  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : AuthService,
    private router : Router) { }

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
      (res)=>{
        this.snackbar.open('OTP verify successfully','OK', {duration:5000},);
        // this.router.navigateByUrl("/otp")
        console.log(res);
      },
      (error) =>{
        console.log("This us ",error)
        this.snackbar.open('Unable to send OTP .Please check the credentials', 'Error', {duration : 5000})
      }
    )
  }

}
