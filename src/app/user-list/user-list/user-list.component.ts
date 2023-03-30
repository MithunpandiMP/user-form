import { Component, OnInit, inject, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api/api-service.service';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
@Injectable({ providedIn: 'root' })


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;
  data: any = [];
  toaster: any;
  preview: string = '';
  users!: User[];
  userSearch!: FormGroup; 
 
  constructor(private fb: FormBuilder, private service: ApiServiceService, private toastrservice: ToastrService,
     private dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public datas: User) {
      this.userSearch = this.fb.group({
        searchText: ['', Validators.pattern('^[a-zA-Z]+$')]
      });
  }
  
  ngOnInit(): void {
    this.getUser();
  }
  
  openConfirmationDialog(id: number) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
       this.deleteUser(id);
      }
       this.dialogRef.close();
    });
  }

  getUser() {
    this.service.getUser().subscribe((data: User[] = []) => {
      this.users = data;
    })
  }
 
  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe((data: any) => {
      this.getUser();
      this.toastrservice.success('User Details deleted successfully...');
    })
  }

  searchUser(searchText: any) {
    if(searchText == '')
     {
       this.getUser();
     }
    else
     {
      this.service.searchUserByText(this.userSearch.value).subscribe((data: any) => {
      this.users = data;
    })
   }
  }

}
