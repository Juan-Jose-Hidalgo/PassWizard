import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { AuthModule } from './pages/auth/auth.module';
import { UserProfileModule } from './pages/user-profile/user-profile.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './services/custom-paginator.service';
import { NavMenuModule } from './shared/nav-menu/nav-menu.module';
import { MyPasswordsModule } from './pages/my-passwords/my-passwords.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    HttpClientModule,
    MaterialModule,
    MyPasswordsModule,
    NavMenuModule,
    NgOptimizedImage,
    UserProfileModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
