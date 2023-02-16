import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPasswordsRoutingModule } from './my-passwords-routing.module';
import { MyPasswordsComponent } from './my-passwords.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { NewCategoryComponent } from './new-category/new-category.component';


@NgModule({
  declarations: [
    MyPasswordsComponent,
    NewPasswordComponent,
    UpdatePasswordComponent,
    NewCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MyPasswordsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MyPasswordsModule { }
