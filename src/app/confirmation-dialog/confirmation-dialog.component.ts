import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent  {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
  public confirmMessage:string | undefined;
}

