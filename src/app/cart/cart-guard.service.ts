import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class CartGuardService implements CanDeactivate<CartComponent> {

  constructor(private service:CartService) {}

  canDeactivate(target: CartComponent ) {
    this.service.updateCart(this.service.cart.cartId).subscribe(
      res => console.log('Cart saved with res : '+res),
      err => alert(err.error.errorMessage)
    )
      
    return true;
  }

}
