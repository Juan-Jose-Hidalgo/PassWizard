import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

//* ANGULAR MATERIAL
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


//* COMPONENTS
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

//* INTERFACES
import { CategoryInterface } from 'src/app/models/category.interface';
import { LogedUser } from 'src/app/models/loged-user.interface';
import { NewPassword } from 'src/app/models/new-password.interface';
import { PasswordInterface } from 'src/app/models/password.interface';
import { PasswordList } from 'src/app/models/password-list.interface';

//* SERVICES & HELPERS
import { AuthService } from '../auth/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { decrypt } from 'src/app/helpers/crypto.helper';
import { PasswordService } from 'src/app/services/password.service';
import { UserService } from 'src/app/services/user.service';
import { categoryName } from 'src/app/helpers/category-name.helper';

@Component({
  selector: 'app-my-passwords',
  templateUrl: './my-passwords.component.html',
  styleUrls: ['./my-passwords.component.scss'],
})
export class MyPasswordsComponent implements OnInit {
  passwords: any[] = [];
  userCategories: CategoryInterface[] = [];
  hidePass = true;

  //* Attributes for mat-table.
  displayedColumns: string[] = ['name', 'password', 'category', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<PasswordList>();
  DATA: PasswordList[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private catService: CategoryService,
    private passwordService: PasswordService,
    private userService: UserService
  ) { }

  get user() {
    return this.auth.getUser;
  }

  ngOnInit(): void {
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
    //Extract name category from this.userCategories array.
    const { name } = this.userCategories.find(cat => cat.id === pass.categoryId)!;
    const passFile: PasswordList = {
      category: name,
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
        this.userCategories = categories.map(cat => {
          //Remove the numeric part of the name category.
          cat.name = categoryName(cat);
          return cat;
        });
        console.log('Categorias:', this.userCategories);
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

  updatePassword(id: number) {
    //Prepare data for dialog.
    const { category, password, name } = this.DATA.find(element => element.passwordId === id)!;
    const categoryIndex = this.userCategories.findIndex(cat => cat.name === category)!;
    const data = { categories: this.userCategories, categoryIndex, password, name };


    //Open dialog.
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '90%',
      maxWidth: '1000px',
      data
    });

    dialogRef.afterClosed().subscribe((result: NewPassword) => {
      if (result) {
        this.passwordService.updateUserPassword(id, result.name, result.password, result.category!).subscribe({
          next: (_) => {
            const index = this.DATA.findIndex(pass => pass.passwordId === id);
            const category = this.userCategories.find(cat => cat.id === result.category)!;
            const name = categoryName(category);

            //Update DATA.
            this.DATA[index].category = name;
            this.DATA[index].name = result.name;
            this.DATA[index].password = result.password;
          },
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

  newCategory() {
    //Open dialog.
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '90%',
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.catService.newCategory(this.user.id, result.name).subscribe({
          next: (res => {
            res.categories[0].name = categoryName(res.categories[0]);
            this.userCategories.push(res.categories[0]);
          }),
          error: console.log
        })
      }
    });
  }
}

