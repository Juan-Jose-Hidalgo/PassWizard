import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment.development';

import { User } from '../../../models/user.interface';
import { UserService } from 'src/app/services/user.service';

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
export class UserMenuComponent implements OnInit {
  @Input() user!: User;
  menuOptions: MenuOption[] = [
    { name: 'Inicio', icon: 'home', url: 'inicio' },
    { name: 'Mis Contraseñas', icon: 'list_alt', url: 'mis-passwords' },
    { name: 'Perfil', icon: 'account_circle', url: 'perfil' }
  ];


  constructor(
    private authService: AuthService,
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('acceder');
  }
}
