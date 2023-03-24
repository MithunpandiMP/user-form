import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent},
  { path: 'UserDetail', component: UserDetailComponent},
  { path: 'UserEdit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
