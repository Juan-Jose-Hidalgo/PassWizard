import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { environment } from 'src/environments/environment.development';

import { User } from '../../../models/user.interface';

interface MenuOption {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() user!: User;
  urlImg = environment.URL
  menuOptions: MenuOption[] = [
    { name: 'Inicio', icon: 'home', url: 'inicio' },
    { name: 'Mis Contraseñas', icon: 'list_alt', url: 'mis-passwords' },
    { name: 'Perfil', icon: 'account_circle', url: 'perfil' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('inicio');
  }
}
