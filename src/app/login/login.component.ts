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
      email : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword
  }

  onSubmit():void {
    const userName = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(userName, password).subscribe(
      (res)=>{
        this.snackbar.open('Login Success','OK', {duration:5000})
      },
      (error) =>{
        this.snackbar.open('Bad Credentials', 'Error', {duration : 5000})
      }
    )
  }

}
