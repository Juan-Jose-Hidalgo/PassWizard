import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    { name: 'Inicio', icon: 'home', url: 'inicio' },
    { name: 'Mis Contraseñas', icon: 'list_alt', url: '#' },
    { name: 'Modificar Perfil', icon: 'account_circle', url: '#' }
  ];

  constructor(public dialog: MatDialog) { }
}
