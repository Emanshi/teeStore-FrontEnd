import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getUser(user:User):Observable<User>{
    return this.http.get<User>(environment.userApi+"getUser/"+user.userId);
  }

  updateProfileDetails(user:User):Observable<string>{
    return this.http.post<string>(environment.userApi+"editUserProfile", user)
  }

  addAddress(address:Address, userId:string):Observable<string>{
    return this.http.post<string>(environment.userApi+"addAddress/"+userId, address)
  }
}
