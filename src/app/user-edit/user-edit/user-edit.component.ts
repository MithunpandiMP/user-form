import { Component, OnInit, inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { ApiServiceService } from 'src/app/api/api-service.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent  implements OnInit {
    id!: string;
    userForm!: FormGroup;  
    data: any = [];
    toaster: any;
    EventValue: any = 'Save';
    users!: User[];
     get f() { return this.userForm.controls; }
  
    constructor(private fb: FormBuilder, private service: ApiServiceService, private toastrservice: ToastrService,
      private router: Router, private route: ActivatedRoute,) {
      
    }
   
    ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
     this.buildForm();
     debugger
     this.service.getUserById(this.id).subscribe((Data: any) => {
      this.userForm.controls["userId"].setValue(Data.userId);
    this.userForm.controls["name"].setValue(Data.name);
    this.userForm.controls["address"].setValue(Data.address);
    this.userForm.controls["country"].setValue(Data.country);
    this.userForm.controls["zipCode"].setValue(Data.zipCode);
    this.userForm.controls["mobileNo"].setValue(Data.mobileNo);
      this.users = Data;
     })
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
    
    Update() {
      if (this.userForm.invalid) {
        return;
      }
      this.userForm.value.userId = 0;
      this.service.postUser(this.userForm.value).subscribe((data: any) => {
        if(data != '')
        {
          this.users = [data];
          this.toastrservice.success('User Details Updated successfully...');
          this.router.navigateByUrl('/');
        }
      })
      this.resetFrom();
    }
   
    resetFrom() {
      this.userForm.reset();
    }
  }
