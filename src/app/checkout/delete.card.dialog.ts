import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-overview-card-dialog',
  templateUrl: 'delete.card.dialog.html',
})
export class DeleteCardDialog {

  constructor(public dialogRef: MatDialogRef<DeleteCardDialog>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close(this.data)
  }
}