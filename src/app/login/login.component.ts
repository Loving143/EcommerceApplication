import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : AuthService,
    private router : Router
  ){}
  loginForm!:FormGroup
  hidePassword = true;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : [null, [Validators.required]],
      password : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]]
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword
  }

  onSubmit():void {
    const username = this.loginForm.get('username')!.value;
    const password = this.loginForm.get('password')!.value;
    const email = this.loginForm.get('email')!.value;

    this.authService.login(username, password,email).subscribe(
      (res)=>{
        this.snackbar.open('OTP Sent successfully','OK', {duration:5000});
        this.router.navigateByUrl("/otp")
      },
      (error) =>{
        console.log("This us ",error)
        this.snackbar.open('Unable to send OTP .Please check the credentials', 'Error', {duration : 5000})
      }
    )
  }

}
