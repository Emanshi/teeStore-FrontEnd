import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'delete.address.dialog.html',
  })
  export class ClearCartDialog {
  
    constructor(public dialogRef: MatDialogRef<ClearCartDialog>, @Inject(MAT_DIALOG_DATA) public data: string, private service:CartService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onYesClick() {
        this.dialogRef.close(this.data)
    }
  }