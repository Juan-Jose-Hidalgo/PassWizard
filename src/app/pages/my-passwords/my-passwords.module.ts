import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPasswordsRoutingModule } from './my-passwords-routing.module';
import { MyPasswordsComponent } from './my-passwords.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyPasswordsComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MyPasswordsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MyPasswordsModule { }
