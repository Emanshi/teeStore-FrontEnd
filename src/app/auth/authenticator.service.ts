import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  user:User;
  sessionUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private http:HttpClient) { }

  loadSessionUser() {
    this.user = new User();
    this.user.userName = "";       
  }

  nextUser(data:User) {
    this.user = data;
    this.sessionUser.next(this.user);
  }
}
