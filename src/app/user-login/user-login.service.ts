import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http:HttpClient) { }

  login(user:User):Observable<User> {
    return this.http.post<User>(environment.loginApi, user);
  }
}
