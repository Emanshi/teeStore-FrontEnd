import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orders } from '../models/orders';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'view-invoice-dialog',
    templateUrl: 'view.invoice.dialog.html',
    styleUrls: ['./view.invoice.dialog.css']
})
export class ViewInvoiceDialog {

    constructor(
        public dialogRef: MatDialogRef<ViewInvoiceDialog>,
        @Inject(MAT_DIALOG_DATA) public order: Orders) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    @ViewChild('content') content: ElementRef;
    onYesClick() {
        let doc = new jsPDF();

    //   let specialElementHandlers = {
    //     '#editor' : function( element , renderer){
    //       return true;
    //     }
    //   };

    //   let content = this.content.nativeElement;

    //   doc.fromHTML( content.innerHTML, 15, 15, {
    //     'width' : 190,
    //     'elementHandlers' : specialElementHandlers
    //   });

    //  doc.save('Invoice.pdf');
    
    //var image = "" 
    doc.addHTML(this.content.nativeElement, function () {
      //doc.addImage(image, 'JPEG',  75, 0, 40, 40);
      doc.save("Invoice.pdf");
    });
        this.dialogRef.close()
    }

}