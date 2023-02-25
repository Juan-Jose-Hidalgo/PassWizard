import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { UdateUserImgComponent } from './udate-user-img/udate-user-img.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UpdateUserComponent,
    UpdateUserPasswordComponent,
    UdateUserImgComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
