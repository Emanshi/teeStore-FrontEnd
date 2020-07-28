import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from '../models/users';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Address } from '../models/address';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAddressDialog } from './delete.address.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  addressForm:FormGroup
  editAddressForm:FormGroup
  loggiedIn:boolean
  loggedInUser:User
  viewUser:User
  profileUpdateSuccessMessage:string
  addAddressSuccessMessage:string
  editAddressSuccessMessage:string
  deleteAddressSuccessMessage:string
  errorMessage:string
  editAddressId:string
  editAddressIndex:number
  editProfileSwitch:boolean;
  addAddressSwitch:boolean;
  editAddressSwitch:boolean
  editButtonText:string;

  constructor(
    private fb:FormBuilder,
    private auth: AuthenticatorService,
    private dialog:MatDialog,
    private service: ProfileService, 
    private snackBar: MatSnackBar,
    private router: Router,
    private title:Title) {
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
    this.editAddressSwitch=false
    this.editAddressIndex=-1

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
    this.service.updateProfileDetails(this.viewUser.userId,this.profileForm.value).subscribe(
      (message)=>{
        this.profileUpdateSuccessMessage=message
        this.errorMessage=null
        this.editProfile()
        this.getUser()
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
      this.editAddressSwitch = false
    } else {
      this.addAddressSwitch = false
      this.editAddressSwitch = false
    }
  }

  addAddress(){
    if (this.addAddressSwitch==true) {
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
    } else if (this.editAddressSwitch==true) {
      this.service.editAddress(this.addressForm.value, this.editAddressId).subscribe(
        (success)=>{
          this.editAddressSuccessMessage=success
          this.errorMessage=null
          this.editAddressSwitch=false
        },
        (err)=>this.errorMessage=err.error.message
      )
    }
  }

  editAddressSwitcher(a:Address, i){
    this.editAddressIndex=i
    this.editAddressId=a.addressId
    this.editAddressSwitch = true
    this.addAddressSwitch = false
    this.editAddressForm=this.fb.group({
      street:[a.street, [Validators.required,Validators.maxLength(100)]],
      city:[a.city, [Validators.required,Validators.maxLength(50)]],
      state:[a.state, [Validators.required,Validators.maxLength(50)]],
      pinCode:[a.pinCode,[Validators.required,Validators.pattern("^[1-9][0-9]{5}$")]]
    })
  }

  cancelEditAddress(){
    this.editAddressIndex=-1
    this.editAddressSwitch = false
    this.addAddressSwitch = false
  }

  editAddress(aId:string){
    this.service.editAddress(this.editAddressForm.value, aId).subscribe(
      (success)=>{
        this.editAddressSuccessMessage=success
        this.errorMessage=null
        this.editAddressSwitch=false
        this.viewUser.addresses[this.editAddressIndex]=this.editAddressForm.value
        this.snackBar.open('Address has been updated', 'Okay', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: 'primary-snackbar'
        });
      },
      (err)=>this.errorMessage=err.error.message
    )
    this.editAddressSwitch=false
  }

  deleteAddressConfirmer(aId:string): void {
    const dialogRef = this.dialog.open(DeleteAddressDialog, {
      width: '250px',
      data: aId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteAddress(result)
    });
  }

  deleteAddress(aId:string) {
    if (aId!=null){
      this.service.deleteAddress(this.viewUser.userId, aId).subscribe(
        success=>{ this.getUser()
          alert(JSON.stringify(this.viewUser))}
        ,
        err=>this.errorMessage=err.error.message
      )
    }
    
  }
}
