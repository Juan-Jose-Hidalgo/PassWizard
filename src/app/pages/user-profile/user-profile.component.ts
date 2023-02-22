import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

//* ANGULAR MATERIAL
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import Swal from 'sweetalert2';

//* SERVICES
import { AuthService } from '../auth/services/auth.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { UdateUserImgComponent } from './udate-user-img/udate-user-img.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 
  urlImg = environment.URL;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  get user(){
    return this.authService.getUser;
  }

  ngOnInit(): void {
 
  }

  updateUser() {
    const data = {
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      userId: this.user.id
    }
    //Open dialog.
    const dialog = this.dialog.open(UpdateUserComponent, {
      width: '90%',
      maxWidth: '1000px',
      data
    });

    //After dialog closed.
    // dialog.afterClosed().subscribe((_) => {
    //   this.userService.getUser(this.userId).subscribe(res => {
    //     this.user = res;
    //   })
    // })
  }

  updateImage() {
    const dialog = this.dialog.open(UdateUserImgComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { id: this.user.id, olderImg: this.user.img }
    });

    //After dialog closed.
    // dialog.afterClosed().subscribe((_) => {
    //   this.userService.getUser(this.userId).subscribe(res => {
    //     this.user = res;
    //   })
    // });
  }

  updatePassword() {
    //Open dialog.
    this.dialog.open(UpdateUserPasswordComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { id: this.user.id }
    })
  }

  deleteAccount() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Perderás todas tus contraseñas y categorías",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#f44336',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Mejor no...',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteAccout(`${this.user.id}`).subscribe();
        Swal.fire(
          'Cuenta eliminada!',
          'Se ha eliminado tu cuenta y toda la información relacionada.',
          'success'
        );
        this.router.navigateByUrl('inicio');
      }
    })
  }

}