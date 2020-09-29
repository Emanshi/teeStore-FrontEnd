import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-overview-review-dialog',
  templateUrl: 'delete.review.dialog.html'
})
export class DeleteReviewDialog {

  constructor(public dialogRef: MatDialogRef<DeleteReviewDialog>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close(this.data)
  }
}