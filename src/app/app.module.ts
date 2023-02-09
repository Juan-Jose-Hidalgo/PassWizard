import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { MaterialModule } from './shared/material/material.module';
import { HomeModule } from './pages/home/home.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SocialNavComponent } from './shared/social-nav/social-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ErrorPageComponent,
    FooterComponent,
    SocialNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
