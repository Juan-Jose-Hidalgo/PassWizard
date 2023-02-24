import { Component, OnInit, ViewChild } from '@angular/core';

//* ANGULAR MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//* COMPONENTS
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

//* INTERFACES
import { CategoryInterface } from 'src/app/models/category.interface';
import { PasswordList, PasswordInterface, NewPassword } from 'src/app/models/passwords.interface';

//* SERVICES & HELPERS
import { AuthService } from '../../services/auth.service';
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
    private passService: PasswordService,
    private userService: UserService
  ) { }

  get user() {
    return this.auth.getUser;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPasswordsList();
  }

  /**
   * Applies a filter to the current data source based on the user's input and updates the table display.
   * 
   * @param event - The event containing the user's input to use as the filter value.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Fetches the passwords of the currently logged-in user and populates the data source for the password table.
   * 
   * @description This method is responsible for fetching the passwords of the currently logged-in user and 
   * populating the data source for the password table. It subscribes to the getUserPasswords() method of
   * the UserService to get the list of passwords, and then converts each password to a PasswordList object
   * using the toPasswordList() method. The resulting list of PasswordList objects is then added to 
   * the DATA array and used to populate the data source for the password table. 
   * The method also sets the paginator and sorter for the table.
   * 
   * @note The DATA array is a class property that stores the list of PasswordList objects for the password table.
   */
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

  /**
   * Transforms a PasswordInterface object into a PasswordList object.
   * 
   * @param pass - The PasswordInterface object to be transformed.
   * @returns The transformed PasswordList object.
   */
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

  /**
   * Retrieves the categories associated with the current user.
   * The retrieved categories will have their name property modified to remove the numeric part of the name.
   */
  getCategories() {
    this.userService.getUserCategories(this.user.id).subscribe(categories => {
      this.userCategories = categories.map(cat => {
        //Remove the numeric part of the name category.
        cat.name = categoryName(cat);
        return cat;
      });
    })
  }

  /**
   * Opens a dialog to create a new password and adds it to the user's password list.
   * 
   * @returns void.
   */
  newPass() {
    //Open dialog.
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      minWidth: '50%',
      data: { categories: this.userCategories, name: '', password: '' }
    });

    //Receive data and create new password when dialog is closed.
    dialogRef.afterClosed().subscribe((result: NewPassword) => {
      if (result) {
        this.passService.newUserPassword(this.user.id, result.category!, result.name, result.password)
          .subscribe(password => {
            const passFile = this.toPasswordList(password);
            this.DATA.push(passFile);
            this.dataSource.data = this.DATA;
          })
      }
    });
  }

  /**
   * Opens a dialog to update a password.
   * 
   * @param id - The id of the password to update.
   * @returns void.
   */
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
        this.passService.updateUserPassword(id, result.name, result.password, result.category!)
          .subscribe((_) => {
            const index = this.DATA.findIndex(pass => pass.passwordId === id);
            const category = this.userCategories.find(cat => cat.id === result.category)!;
            const name = categoryName(category);

            //Update DATA.
            this.DATA[index].category = name;
            this.DATA[index].name = result.name;
            this.DATA[index].password = result.password;
          })
      }
    });
  }

  /**
   * Deletes a password with the given id.
   * 
   * @param id - The id of the password to be deleted.
   * @returns void.
   */
  deletePassword(id: number) {
    this.passService.deleteUserPassword(id).subscribe((_) => {
      const dataFilter = this.DATA.filter(password => password.passwordId !== id);
      this.DATA = [...dataFilter];
      this.dataSource.data = this.DATA;
    })
  }

  /**
   * Opens a dialog to create a new category and sends a request to the server to create it.
   * If the category is created successfully, it is added to the list of user categories.
   */
  newCategory() {
    //Open dialog.
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '90%',
      maxWidth: '1000px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.catService.newCategory(this.user.id, result.name).subscribe(res => {
          res.categories[0].name = categoryName(res.categories[0]);
          this.userCategories.push(res.categories[0]);
        })
      }
    });
  }
}

