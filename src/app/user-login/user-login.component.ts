import { Component, OnInit } from '@angular/core';
import { UserLoginService } from './user-login.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../models/users';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
loginForm:FormGroup;
user:User;
errorMessage:string;

  constructor(private fb:FormBuilder,private service:UserLoginService,private title:Title) { 
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
    let regPhone:RegExp = /^[0-9]{10}$/;
    let regEmail:RegExp = /^[a-zA-z]+[A-Za-z0-9_.-]+[A-Za-z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
    let userCred=this.loginForm.value.userCred;
    if (regPhone.test(userCred)) {
      this.user.contactNumber=userCred
    } else if (regEmail.test(userCred)) {
      this.user.emailId=userCred
    } else {}
    this.user.password=this.loginForm.value.password;
    this.service.login(this.user);
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
