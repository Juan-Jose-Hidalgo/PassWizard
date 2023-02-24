import { Component} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  get user() {
    return this.authService.getUser;
  }

}
