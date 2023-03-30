import { Component, OnInit, inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { ApiServiceService } from '../api/api-service.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userForm!: FormGroup;  
  data: any = [];
  toaster: any;
  EventValue: any = 'Save';
  users!: User[];
   get f() { return this.userForm.controls; }

  constructor(private fb: FormBuilder, private service: ApiServiceService, private toastrservice: ToastrService,private router: Router) {
    
  }
 
  ngOnInit(): void {
   this.buildForm();
  }

  buildForm(){
    this.userForm = this.fb.group({
      userId: [0 , [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"),, Validators.required]],
      mobileNo: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.required]]
    });
  }
  
  Save() {
    if (this.userForm.invalid) {
          return;
        }
    this.service.postUser(this.userForm.value).subscribe((data: any) => {
      if(data)
      {
        this.toastrservice.success('User Details saved successfully...');
        this.router.navigateByUrl('/');
      }
    })
  }
 
  resetFrom() {
    this.userForm.reset();
    this.EventValue = 'Save';
  }
}
