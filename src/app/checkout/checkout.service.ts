import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  placeOrder(cart: Cart, aId: string, payment: string) {
    return this.http.post(environment.orderApi + 'buyNow/' + aId + '?payment=' + payment, cart, { responseType: 'text' });
  }

  addCard(card: Card, userId: string) {
    return this.http.post(environment.userApi + 'addCard/' + userId, card, { responseType: 'text' });
  }

  getAllCards(userId: string): Observable<Card[]> {
    return this.http.get<Card[]>(environment.userApi + "getAllCards/" + userId)
  }
}
