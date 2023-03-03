import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuRoutingModule } from './nav-menu-routing.module';
import { NavMenuComponent } from './nav-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from '../footer/footer.component';
import { SocialNavComponent } from '../social-nav/social-nav.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent,
    SocialNavComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NavMenuRoutingModule,
  ]
})
export class NavMenuModule { }
