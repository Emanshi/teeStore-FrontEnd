import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'delete.address.dialog.html',
  })
  export class RemoveProductDialog {
  
    constructor(public dialogRef: MatDialogRef<RemoveProductDialog>, @Inject(MAT_DIALOG_DATA) public data: string) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onYesClick() {
        this.dialogRef.close(this.data)
    }
  }