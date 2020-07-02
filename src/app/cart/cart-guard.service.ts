import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CartComponent } from './cart.component';


@Injectable({
  providedIn: 'root'
})
export class CartGuardService implements CanDeactivate<CartComponent> {

  canDeactivate(target: CartComponent ) {
      if (true) {
          return window.confirm('cancel this page?');
      }
      return true;
  }

}
