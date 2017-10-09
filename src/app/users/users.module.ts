/**
 * Created by saruni on 7/21/17.
 */

import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { userRoutingComponents, UserRoutingModule} from './user-routing.module';
import { UserService } from '../common/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    ReactiveFormsModule,
  ],
  declarations: [
    userRoutingComponents
  ],
  providers: [ UserService ]
})
export class UsersModule {}
