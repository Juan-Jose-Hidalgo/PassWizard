import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LogedUser } from 'src/app/models/loged-user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  get user() {
    return this.authService.getUser;
  }

  ngOnInit(): void {

  }
}
