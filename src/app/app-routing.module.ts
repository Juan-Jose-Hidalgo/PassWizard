import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidateGuard } from './guards/token-validate.guard';

const routes: Routes = [
  {
    path: 'acceder',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./shared/nav-menu/nav-menu.module').then(m => m.NavMenuModule),
    canActivate: [TokenValidateGuard],
    canLoad: [TokenValidateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
