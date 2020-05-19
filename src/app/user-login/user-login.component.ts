import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/users';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
loginForm:FormGroup;
user:User;
loggedInUser:User;
loggedIn:boolean;
errorMessage:string;

  constructor(private fb:FormBuilder, private router:Router, private service:UserLoginService,private auth:AuthenticatorService,private title:Title) { 
    title.setTitle("Login")
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group(
      {
        userCred:['',[Validators.required,this.ValidateEmailPhone]],
        password:['',[Validators.required,Validators.minLength(7),Validators.maxLength(20)]]
      }
    )
  }

  login() {
    this.user = new User();
    let regPhone:RegExp = /^[0-9]{10}$/;
    let regEmail:RegExp = /^[a-zA-z]+[A-Za-z0-9_.-]+[A-Za-z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
    let userCred=this.loginForm.value.userCred;
    if (regPhone.test(userCred)) {
      this.user.contactNumber=userCred;
    } else if (regEmail.test(userCred)) {
      this.user.emailId=userCred
    }
    this.user.password=this.loginForm.value.password;
    this.service.login(this.user).subscribe(
      (response)=>{ 
        this.errorMessage=null;
        this.loggedInUser=response;
        this.auth.nextUser(this.loggedInUser); 
        this.router.navigate(['/home']);
      },
      (error)=>this.errorMessage=error.error.message//.error.message
    );
    alert(this.errorMessage)
  }

  ValidateEmailPhone(control: AbstractControl): {[key: string]: any} | null  {
    let regPhone:RegExp = /^[0-9]{10}$/;
    let regEmail:RegExp = /^[a-zA-z]+[A-Za-z0-9_.-]+[A-Za-z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
    if (control.value && !(regPhone.test(control.value) || regEmail.test(control.value))) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }
}
