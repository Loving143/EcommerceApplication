import { Component } from '@angular/core';
import { UserStorageService } from './services/UserStorage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ecommerce';
  isCustomerLoggedIn : boolean = UserStorageService.isCustomerLoggined();
  isAdminLoggedIn : boolean = UserStorageService.isAdminLoggined();

  constructor(private router : Router){}

  ngOnInit(): void{
    this.router.events.subscribe(event =>{
      this.isAdminLoggedIn = UserStorageService.isAdminLoggined();
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggined();
    })
  }

  logout(){
UserStorageService.signout();
this.router.navigateByUrl('login');
  }
}
