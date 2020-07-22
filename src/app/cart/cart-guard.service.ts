import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class CartGuardService implements CanDeactivate<CartComponent> {

  constructor(private service:CartService,private snackBar:MatSnackBar) {}

  canDeactivate(target: CartComponent ) {
    if (this.service.changed==true) {
      this.service.updateCart(this.service.cart.cartId).subscribe(
        res => {
          console.log('Cart saved with res : '+res)
          this.snackBar.open('Cart Updated!', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            panelClass: 'primary-snackbar'
          })
        },
        err => alert(JSON.stringify(err))
      )
      this.service.changed=false
    }
      
    return true;
  }

}
