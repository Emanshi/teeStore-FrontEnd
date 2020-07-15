import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'clear-cart-dialog',
    templateUrl: 'clear.cart.dialog.html',
  })
  export class ClearCartDialog {
  
    constructor(public dialogRef: MatDialogRef<ClearCartDialog>) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onYesClick() {
      this.dialogRef.close(true)
    }
  }