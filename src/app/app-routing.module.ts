import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidateGuard } from './guards/token-validate.guard';

const routes: Routes = [
  {
    path: 'acceso',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'mis-passwords/:username',
    loadChildren: () => import('./pages/my-passwords/my-passwords.module').then(m => m.MyPasswordsModule),
    canActivate: [TokenValidateGuard],
    canLoad: [TokenValidateGuard]
  },
  {
    path: 'perfil/:username',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [TokenValidateGuard],
    canLoad: [TokenValidateGuard]
  },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
