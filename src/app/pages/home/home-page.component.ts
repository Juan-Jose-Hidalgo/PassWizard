import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { categoryName } from 'src/app/helpers/category-name.helper';
import { CategoryInterface } from 'src/app/models/category.interface';
import { DataPassword } from 'src/app/models/data-password.interface';
import { NewPassword } from 'src/app/models/new-password.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { PasswordService } from 'src/app/services/password.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';
import { AuthService } from '../auth/services/auth.service';
import { NewPasswordComponent } from '../my-passwords/new-password/new-password.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: DataPassword = {
    length: 16,
    lowerCase: true,
    upperCase: true,
    numbers: true,
    symbols: true
  };

  lengthError?: string | boolean;
  checkboxError?: string | boolean;

  categories!: any[];

  // Password-image inputs
  image = '';
  urlImage = '';
  author = '';

  // Password-gen inputs
  password = '';
  passwordStrength = '';
  badge = '';

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private fv: FormValidatorService,
    private pass: PasswordService,
    private router: Router,
    private us: UserService,
  ) { };

  ngOnInit(): void {
    this.generatePassword();
    if (this.user.id >= 0) this.getCategories();
  }

  get user() {
    return this.authService.getUser;
  }

  /**
   * Checks for errors in the data required to create the password.
   * - If there are errors: invoke the function ```generateAlert()``` to display an error alert.
   * - If there are no errors: invoke the function ```generatePassword()```.
   * Then invoke the function ```checkStrongPassword()``` to check the password strength and generate the data.
   */
  generatePassword() {
    if (this.checkErrors()) this.generateAlert(); //Check errors on inputs an checkboxes.
    else {
      //Generate password.
      const { password, checks } = this.pass.generatePassword(this.data);
      this.password = password;

      //Set img info and password strenght.
      const { url, img, author, msg } = this.pass.chekStrongPassword(this.password, checks);
      this.passwordStrength = msg;
      this.image = img;
      this.urlImage = url;
      this.author = author;

      //Set badge class.
      this.badge = this.setBadgeClass();
    }
  }

  setBadgeClass() {
    if (this.passwordStrength === 'débil') return 'pass-gen__badget pass-gen__badget--weak';
    else if (this.passwordStrength === 'media') return 'pass-gen__badget pass-gen__badget--medium';
    else if (this.passwordStrength === 'fuerte') return 'pass-gen__badget pass-gen__badget--strong';
    else return 'pass-gen__badget';
  }

  /**
   * Increases or decreases the length of the password depending on the parameter ```num```.
   * 
   * @param num ```number```
   * @returns ```void```
   */
  setValue(num: number): void {
    if (this.data.length + num < 8 || this.data.length + num > 16) return;
    this.data.length += num;
  }

  changeDataLength(num: number) {
    this.data.length = num;
  }

  /**
   * Checks for errors in the data and gives the corresponding value to the variables that store the errors.
   * 
   * Returns true/false depending on errors.
   * 
   * @returns ```boolean```
   */
  checkErrors() {
    const checkBox = this.fv.checkboxIsValid(this.data);
    const length = this.fv.lengthIsValid(this.data.length);

    this.checkboxError = (!checkBox) ? 'Debes indicar al menos una opción para los caracteres.' : false;
    this.lengthError = (!length) ? 'Tienes que escoger una longitud entre 8 y 16 caracteres.' : false;

    return (!checkBox || !length) ? true : false;
  }

  /**
   * Generate an alert error.
   */
  generateAlert() {
    this.dialog.open(ErrorPageComponent, {
      data: {
        lengthError: this.lengthError,
        checkboxError: this.checkboxError
      }
    });
  }

  savePassword() {
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      minWidth: '50%',
      data: { categories: this.categories, name: '', password: this.password }
    });

    //Receive data and create new password when dialog is closed.
    dialogRef.afterClosed().subscribe((result: NewPassword) => {
      if (result) {
        this.pass.newUserPassword(this.user.id, result.category!, result.name, result.password)
          .subscribe({
            next: (_) => this.router.navigateByUrl('mis-passwords'),
            error: console.log
          })
      }
    });
  }

  getCategories() {
    this.us.getUserCategories(this.user.id).subscribe(categories => {
      this.categories = categories.map(category => {
        category.name = categoryName(category);
        return category;
      })
    })
  }
}
