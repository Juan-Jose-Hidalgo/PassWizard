import { Component, OnInit, ViewChild } from '@angular/core';

//* ANGULAR MATERIAL
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//* COMPONENTS
import { NewPasswordComponent } from './new-password/new-password.component';

//* INTERFACES
import { Category } from 'src/app/models/category.type';
import { LogedUser } from 'src/app/models/loged-user.interface';
import { NewPassword } from 'src/app/models/new-password.interface';
import { PasswordInterface } from 'src/app/models/password.interface';
import { PasswordList } from 'src/app/models/password-list.interface';

//* SERVICES
import { AuthService } from '../auth/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { decrypt } from 'src/app/helpers/crypto.helper';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-my-passwords',
  templateUrl: './my-passwords.component.html',
  styleUrls: ['./my-passwords.component.scss']
})
export class MyPasswordsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'password', 'category', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<PasswordList>();
  DATA: PasswordList[] = [];
  passwords: any[] = [];
  user!: LogedUser;
  userCategories: Category = {};
  hidePass = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private passwordService: PasswordService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser;
    this.getCategories();
    this.getPasswordsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPasswordsList() {
    this.userService.getUserPasswords(this.user.id).subscribe({
      next: (passwords => {
        passwords.forEach(pass => {
          const passFile: PasswordList = this.toPasswordList(pass);
          this.DATA.push(passFile);
        });
        this.dataSource.data = this.DATA;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  toPasswordList(pass: PasswordInterface) {
    const categoryName = pass.categoryId;
    const passFile: PasswordList = {
      category: this.userCategories[categoryName] || "",
      created_at: pass.createdAt || "",
      name: pass.name,
      password: decrypt(pass.password),
      passwordId: pass.id,
      actions: ''
    };
    return passFile;
  }

  getCategories() {
    this.userService.getUserCategories(this.user.id).subscribe({
      next: (categories => {
        categories.forEach(category => {
          const name = category.name.split('_').pop();
          const cat: Category = {};
          this.userCategories[category.id] = name;
        });
      }),
      error: console.log
    })
  }

  passVisibility(event: any) {
    //Change input type.
    let inputType = event.target.parentNode.parentNode.children[0].type
    inputType = (inputType === 'password') ? 'text' : 'password';
    event.target.parentNode.parentNode.children[0].setAttribute('type', inputType);

    //Change icon img.
    const textIcon = (inputType === 'password') ? 'visibility_off' : 'visibility';
    event.target.innerHTML = textIcon;
  }

  newPass() {
    //Open dialog.
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      minWidth: '50%',
      data: { categories: this.userCategories, name: '', password: '' }
    });

    //Receive data and create new password when dialog is closed.
    dialogRef.afterClosed().subscribe((result: NewPassword) => {
      if (result) {
        this.passwordService.newUserPassword(this.user.id, result.category!, result.name, result.password)
          .subscribe({
            next: (password => {
              const passFile = this.toPasswordList(password);
              this.DATA.push(passFile);
              this.dataSource.data = this.DATA;
            }),
            error: console.log
          })
      }
    });
  }

  deletePassword(id: number) {
    this.passwordService.deleteUserPassword(id).subscribe({
      next: (_) => {
        const dataFilter = this.DATA.filter(password => password.passwordId !== id);
        this.DATA = [...dataFilter];
        this.dataSource.data = this.DATA;
      },
      error: console.log
    })
  }

  updatePassword(id: number) {
    console.log('Actualizar:', id)
  }
}

