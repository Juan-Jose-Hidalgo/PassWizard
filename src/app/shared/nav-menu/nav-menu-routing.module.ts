import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';

const routes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [
      { path: 'inicio', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
      { path: 'mis-passwords', loadChildren: () => import('../../pages/my-passwords/my-passwords.module').then(m => m.MyPasswordsModule) },
      { path: 'perfil', loadChildren: () => import('../../pages/user-profile/user-profile.module').then(m => m.UserProfileModule) },
      { path: '**', redirectTo: 'inicio' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavMenuRoutingModule { }
