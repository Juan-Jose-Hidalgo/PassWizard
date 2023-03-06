import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
