import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../models/users';
import { AuthenticatorService } from '../auth/authenticator.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  loggiedIn:boolean
  loggedInUser:User
  viewUser:User
  errorMessage:string
  editProfileSwitch:boolean;
  editButtonText:string;

  constructor(private fb:FormBuilder,private auth: AuthenticatorService,private service: ProfileService, private router: Router,private title:Title) {
    title.setTitle('Profile')
   }

  ngOnInit(): void {
    this.loggiedIn=false
    this.auth.sessionUser.subscribe(
      (data)=>{
        this.loggedInUser=data;
        if(data.userName!=null){
          this.loggiedIn=true
        }
      }
    )

    if(!this.loggiedIn){
      this.router.navigate(['/home'])      
    }

    this.editProfileSwitch=true
    this.editButtonText='Edit'

    this.profileForm=this.fb.group({
      userName:[this.loggedInUser.userName],
      emailId:[this.loggedInUser.emailId],
      contactNo:[this.loggedInUser.contactNumber],
      dateOfBirth:[this.loggedInUser.dateOfBirth]
    })

    this.profileForm.disable()

    this.getUser()
  }

  getUser() {
    this.service.getUser(this.loggedInUser).subscribe(
      (response)=>this.viewUser=response,
      (error)=>this.errorMessage=error.error.message
    )
  }

  editProfile() {
    if (this.editProfileSwitch==true) {
      this.editButtonText='Cancel'
      this.editProfileSwitch=false;
      this.profileForm.enable()
    } else {
      this.editButtonText='Edit'
      this.editProfileSwitch=true
      this.profileForm.disable()
    }
  }

  updateDetails() {
    return;
  }
}
