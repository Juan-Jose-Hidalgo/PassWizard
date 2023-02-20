import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

//* ANGULAR MATERIAL
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//* SERVICES
import { AuthService } from '../auth/services/auth.service';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    email: '',
    id: -1,
    img: '',
    name: '',
    password: '',
    username: ''
  }
  userId!: number;
  urlImg = environment.URL;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUser.id;
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    })
  }

  updateUser() {
    const data = {
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      userId: this.userId
    }
    //Open dialog.
    const dialog = this.dialog.open(UpdateUserComponent, {
      width: '90%',
      maxWidth: '1000px',
      data
    });

    //After dialog closed.
    dialog.afterClosed().subscribe((_) => {
      this.userService.getUser(this.userId).subscribe(res => {
        this.user = res;
      })
    })
  }

}
