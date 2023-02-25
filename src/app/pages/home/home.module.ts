import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PasswordImageComponent } from './password-image/password-image.component';
import { PassworGenComponent } from './password-gen/password-gen.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    HomePageComponent,
    PasswordImageComponent,
    PassworGenComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
