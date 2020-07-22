import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  changed=false
  cart:Cart

  constructor(private http:HttpClient) { }

  getCart(userId:string):Observable<Cart> {
    return this.http.get<Cart>(environment.cartApi+"getCart?userId="+userId)
  }

  removeProduct(userId:string, productId:string, size:string):Observable<number> {
    return this.http.delete<number>(environment.cartApi+"removeProduct?userId="+userId+"&productId="+productId+"&size="+size)
  }

  updateCart(cartId:string) {
    return this.http.put(environment.cartApi+'editCart/'+cartId, this.cart, {responseType: 'text'})
  }

  clearCart(cartId:string):Observable<Cart> {
    return this.http.delete<Cart>(environment.cartApi+'clearCart/'+cartId)
  }
  // addProductToCart(category:string):Observable<> {
  //   return this.http.get<>(environment.productApi+'getProductsByCategory/'+category)
  // }
}
