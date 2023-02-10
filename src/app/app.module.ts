import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './shared/auth/auth.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { MaterialModule } from './shared/material/material.module';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { SocialNavComponent } from './shared/social-nav/social-nav.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ErrorPageComponent,
    FooterComponent,
    SocialNavComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
