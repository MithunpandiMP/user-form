import { Component, OnInit, inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { ApiServiceService } from '../api/api-service.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;
  userForm: FormGroup = new FormGroup({});  
  data: any = [];
  toaster: any;
  preview: string = '';
  EventValue: any = 'Save';
  users: User[] = [];
   get f() { return this.userForm.controls; }

  constructor(private fb: FormBuilder, private service: ApiServiceService, private toastrservice: ToastrService, private dialog: MatDialog) {
    this.userForm = fb.group({
      userId: [0 , [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"),, Validators.required]],
      mobileNo: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]]
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
  Submit() {
    if (this.userForm.invalid) {
      return;
    }
    if (this.userForm.value.userId > 0) {
      this.Update()
    }
    else {
      this.Save();
    }
    this.resetFrom();
  }
  Save() {
    this.preview = JSON.stringify(this.userForm.value);
    this.userForm.value.userId = 0;
    this.service.postUser(this.userForm.value).subscribe((data: any) => {
      if(data != '')
      {
        this.toastrservice.success('User Details saved successfully...');
      }
    })
  }
  Update() {
    this.service.putUser(this.userForm.value).subscribe((data: any) => {
      if(data != '')
      {
      this.toastrservice.success('User Details updated successfully...');
      }
    })
  }

  EditUser(Data: any) {
    this.userForm.controls["userId"].setValue(Data.userId);
    this.userForm.controls["name"].setValue(Data.name);
    this.userForm.controls["address"].setValue(Data.address);
    this.userForm.controls["country"].setValue(Data.country);
    this.userForm.controls["zipCode"].setValue(Data.zipCode);
    this.userForm.controls["mobileNo"].setValue(Data.mobileNo);
    this.EventValue = 'Update';
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe((data: any) => {
      this.users = data;
      this.getUser();
      this.toastrservice.success('User Details deleted successfully...');
    })
  }
  searchUser(data: any) {
    if(data == '')
     {
       this.getUser();
     }
    else
     {
      this.userForm.value.name = data;
      this.userForm.value.zipCode = 0;
      this.userForm.value.mobileNo = 0;
      this.userForm.value.country = '';
      this.userForm.value.address = '';
      this.service.getUserById(this.userForm.value).subscribe((data: any) => {
      this.users = data;
    })
   }
  }
  resetFrom() {
    this.getUser();
    this.userForm.reset();
    this.EventValue = 'Save';
  }
}