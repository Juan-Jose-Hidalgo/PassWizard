import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
