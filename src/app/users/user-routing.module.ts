/**
 * Created by saruni on 7/21/17.
 */

import { NgModule }       from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent }    from './login.component';
import { RegisterComponent }  from './register.component';
import { UsersComponent } from './users.component';

const usersRoutes: Routes = [
  { path: 'login',  component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
export const userRoutingComponents = [
];
