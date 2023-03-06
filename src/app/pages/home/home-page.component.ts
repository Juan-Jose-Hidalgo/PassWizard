import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

//* THIRD PARTY LIBRARIES.
import Swal from 'sweetalert2';

//* COMPONENT.
import { NewPasswordComponent } from '../my-passwords/new-password/new-password.component';

//* INTERFACES.
import { DataPassword } from 'src/app/models/data-password.interface';
import { NewPassword } from 'src/app/models/passwords.interface';

//* HELPER FUNCTIONS.
import { categoryName } from 'src/app/helpers/category-name.helper';
import { IMG_DATA } from 'src/app/helpers/password-image-data.helper';
import { strengthClassMap } from 'src/app/helpers/set-badget-class.helper';

//* SERVICES
import { AuthService } from '../../services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { PasswordService } from 'src/app/services/password.service';
import { UserService } from 'src/app/services/user.service';

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
  png = ''; // URL to PNG image.
  webp = ''; // URL to WEBP image.
  urlImage = ''; // URL of the download site for the original image
  author = ''; // Author of the original image.

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
   * Generates a new password and sets its info. If there are errors in the inputs or checkboxes,
   * it generates an alert instead.
   */
  generatePassword() {
    this.checkErrors(this.data) ? this.generateAlert() : this.setPasswordInfo();
  }

  /**
   * Sets the info for a generated password, including its strength, image, and badge class.
   */
  setPasswordInfo() {
    //Generate password.
    const { password, checks } = this.pass.generatePassword(this.data);
    this.password = password;

    //Set img info and password strength.
    const strength = this.pass.chekStrongPassword(this.password, checks);
    this.passwordStrength = strength;
    this.png = IMG_DATA[strength].png;
    this.webp = IMG_DATA[strength].webp;
    this.urlImage = IMG_DATA[strength].url;
    this.author = IMG_DATA[strength].author;

    //Set badge class.
    this.badge = this.setBadgeClass();
  }

  /**
   * Returns the CSS class corresponding to the current password strength rating, as determined by
   * the `passwordStrength` property of the class instance.
   * 
   * @returns The CSS class name corresponding to the password strength rating, or the default
   * class name if no match is found in the `strengthClassMap` object.
   */
  setBadgeClass() {
    return strengthClassMap[this.passwordStrength] || 'pass-gen__badget';
  }

  /**
   * Sets the length of the password by adding or subtracting a given number.
   * The password length must be between 8 and 16 characters, inclusive.
   * @param num The number to add or subtract from the password length.
   */
  setValue(num: number): void {
    if (this.data.length + num < 8 || this.data.length + num > 16) return;
    this.data.length += num;
  }

  changeDataLength(num: number) {
    this.data.length = num;
  }

  /**
   * Checks if the given password configuration is valid.
   * 
   * @param data The password configuration to check.
   * @returns `true` if the configuration is valid, `false` otherwise.
   */
  checkErrors(data: DataPassword) {
    const checkBoxes = [data.lowerCase, data.upperCase, data.numbers, data.symbols];
    const checkBox = checkBoxes.some(cb => cb);
    const length = this.fv.lengthIsValid(data.length);

    this.checkboxError = !checkBox ? 'Debes indicar al menos una opción para los caracteres.' : false;
    this.lengthError = !length ? 'Tienes que escoger una longitud entre 8 y 16 caracteres.' : false;

    return !checkBox || !length;
  }

  /**
   * Generate an alert error.
   */
  generateAlert() {
    const errors = [this.lengthError, this.checkboxError].filter(error => !!error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errors.join('\n')
    });
  }

  /**
   * Opens a modal dialog to save a new password for the user.
   * Receives the new password data from the modal dialog and sends it to the backend to be saved.
   * Navigates to the user's password list upon success, or logs any errors to the console.
   */
  savePassword(): void {
    // Open a modal dialog to save a new password
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      minWidth: '50%',
      // Pass in data to the modal dialog
      data: { categories: this.categories, name: null, password: this.password }
    });

    // Receive data and create new password when dialog is closed
    dialogRef.afterClosed().subscribe((result: NewPassword) => {
      // Only create a new password if data was received from the modal dialog
      if (result) {
        this.pass.newUserPassword(this.user.id, result.category!, result.name, result.password)
          .subscribe({
            next: (_) => this.router.navigateByUrl('mis-passwords'),
          });
      }
    });
  }

  /**
   * Retrieves the categories for the current user and updates the categories array with the parsed category names.
   */
  getCategories(): void {
    this.us.getUserCategories(this.user.id).subscribe(categories => {
      this.categories = categories.map(category => {
        category.name = categoryName(category);
        return category;
      });
    });
  }
}
