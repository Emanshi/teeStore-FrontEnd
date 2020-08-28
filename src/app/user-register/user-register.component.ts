import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from './user-register.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from '../models/users';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: User;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private service: UserRegisterService, private title: Title) {
    title.setTitle("Register")
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, this.validatePassword, Validators.minLength(7), Validators.maxLength(20)]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-z]+[A-Za-z0-9_.-]+[A-Za-z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$'), Validators.maxLength(70)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      dateOfBirth: ['', [Validators.required, this.validateDateOfBirth]]
    })
  }

  register() {
    // this.registrationForm.value.dateOfBirth=this.registrationForm.value.dateOfBirth.toISOString().split("T")[0];
    this.service.register(this.registrationForm.value).subscribe(
      (response) => {
        this.user = response;
        this.errorMessage = null;
        this.router.navigate(['/login'])
      },
      (error) => this.errorMessage = error.error.message
    )
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    let reg1: RegExp = /.*[A-Z]+.*/
    let reg2: RegExp = /.*[a-z]+.*/
    let reg3: RegExp = /.*[0-9]+.*/
    let reg4: RegExp = /.*[!@#$%^&*].*/
    if (reg1.test(control.value)) {
      if (reg2.test(control.value)) {
        if (reg3.test(control.value)) {
          if (reg4.test(control.value)) {
            return null;
          }
        }
      }
    }
    return { 'passInvalid': true };
  }

  validateDateOfBirth(control: AbstractControl): { [key: string]: any } | null {
    let today = new Date();
    let dob = new Date(control.value);
    if (today.getFullYear() - dob.getFullYear() < 16) {
      return { 'dobInvalid': true };
    }
    return null;
  }

}
