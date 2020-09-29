import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from '../models/review';

@Component({
    selector: 'edit-review-dialog',
    templateUrl: 'edit.review.dialog.html'
})
export class EditReviewDialog {

    constructor(
        public dialogRef: MatDialogRef<EditReviewDialog>,
        @Inject(MAT_DIALOG_DATA) public review: Review) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        this.dialogRef.close(this.review)
    }
}