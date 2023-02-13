import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPasswordsRoutingModule } from './my-passwords-routing.module';
import { MyPasswordsComponent } from './my-passwords.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    MyPasswordsComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    MyPasswordsRoutingModule
  ]
})
export class MyPasswordsModule { }
