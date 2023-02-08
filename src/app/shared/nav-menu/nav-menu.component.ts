import { Component } from '@angular/core';

interface MenuOption {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  menuOptions: MenuOption[] = [
    { name: 'Inicio', icon: 'home', url: '#' },
    { name: 'Mis Contraseñas', icon: 'list_alt', url: '#' },
    { name: 'Modificar Perfil', icon: 'account_circle', url: '#' }
  ]
}
