import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'remove-product-dialog',
    templateUrl: 'remove.product.dialog.html',
  })
  export class RemoveProductDialog {
  
    constructor(public dialogRef: MatDialogRef<RemoveProductDialog>, @Inject(MAT_DIALOG_DATA) public data: number) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onYesClick() {
        this.dialogRef.close(this.data)
    }
  }