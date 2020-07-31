import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  placeOrder(cart: Cart):Observable<Cart> {
    return this.http.post<Cart>(environment.orderApi+'buyNow',cart);
  }
}
