import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  addressForm:FormGroup
  loggiedIn:boolean
  loggedInUser:User
  viewUser:User
  profileUpdateSuccessMessage:string
  addAddressSuccessMessage:string
  errorMessage:string
  editProfileSwitch:boolean;
  addAddressSwitch:boolean;
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

    this.addAddressSwitch=false

    this.profileForm=this.fb.group({
      userName:[this.loggedInUser.userName],
      emailId:[this.loggedInUser.emailId],
      contactNo:[this.loggedInUser.contactNumber],
      dateOfBirth:[this.loggedInUser.dateOfBirth]
    })

    this.addressForm=this.fb.group({
      street:['', [Validators.required,Validators.maxLength(100)]],
      city:['', [Validators.required,Validators.maxLength(50)]],
      state:['', [Validators.required,Validators.maxLength(50)]],
      pinCode:['',[Validators.required,Validators.pattern("^[1-9][0-9]{5}$")]]
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
    this.service.updateProfileDetails(this.profileForm.value).subscribe(
      (message)=>{
        this.profileUpdateSuccessMessage=message
        this.errorMessage=null
        this.editProfile()
      },
      (error)=>{
        this.errorMessage=error.error.message
        this.profileUpdateSuccessMessage=null
      }
    )
  }

  addAddressSwitcher(){
    if (this.addAddressSwitch==false) {
      this.addAddressSwitch = true
    } else {
      this.addAddressSwitch = false
    }
  }

  addAddress(){
    this.service.addAddress(this.addressForm.value, this.viewUser.userId).subscribe(
      (message)=>{
        this.addAddressSuccessMessage=message
        this.errorMessage=null
        this.addAddressSwitcher()
      },
      (error)=>{
        this.errorMessage=error.error.message
        this.addAddressSuccessMessage=null
      }
    )
  }
}
