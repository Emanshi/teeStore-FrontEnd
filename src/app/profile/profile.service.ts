import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(environment.userApi + "getUser/" + user.userId);
  }

  updateProfileDetails(userId: string, user: User) {
    return this.http.post(environment.userApi + "editUserProfile/" + userId, user, { responseType: 'text' })
  }

  addAddress(address: Address, userId: string) {
    return this.http.post(environment.userApi + "addAddress/" + userId, address, { responseType: 'text' })
  }

  editAddress(address: Address, addressId: string) {
    return this.http.put(environment.userApi + "editAddress/" + addressId, address, { responseType: 'text' })
  }

  deleteAddress(userId: string, addressId: string) {
    return this.http.delete(environment.userApi + "deleteAddress?userId=" + userId + "&addressId=" + addressId, { responseType: 'text' })
  }

  getOrderByUserId(userId: string): Observable<Orders[]> {
    return this.http.get<Orders[]>(environment.orderApi + "getOrderByUserId?userId=" + userId)
  }
}
