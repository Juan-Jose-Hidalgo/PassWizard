import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { SocialNavComponent } from './shared/social-nav/social-nav.component';
import { AuthModule } from './pages/auth/auth.module';
import { UserProfileModule } from './pages/user-profile/user-profile.module';
import { UserMenuComponent } from './shared/nav-menu/user-menu/user-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserMenuComponent,
    FooterComponent,
    SocialNavComponent,
    UserMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    HttpClientModule,
    MaterialModule,
    UserProfileModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
