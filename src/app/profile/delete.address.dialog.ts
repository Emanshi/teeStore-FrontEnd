import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'delete.address.dialog.html',
  })
  export class DeleteAddressDialog {
  
    constructor(public dialogRef: MatDialogRef<DeleteAddressDialog>, @Inject(MAT_DIALOG_DATA) public data: string, private service:ProfileService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onYesClick() {
        this.dialogRef.close(this.data)
    }
  }