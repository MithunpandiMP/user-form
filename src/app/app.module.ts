import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';  
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ApiServiceService } from './api/api-service.service';
import { UserHttpInterceptorInterceptor } from './interceptor/user-http-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { UserListComponent } from './user-list/user-list/user-list.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserEditComponent } from './user-edit/user-edit/user-edit.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    ConfirmationDialogComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ApiServiceService, { provide: HTTP_INTERCEPTORS, useClass: UserHttpInterceptorInterceptor, multi:true }, 
    { provide: MAT_DIALOG_DATA, useValue: {} },{ provide: MatDialogRef ,useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
