import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataPassword } from 'src/app/models/data-password.interface';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { PasswordService } from 'src/app/services/password.service';
import { ErrorPageComponent } from 'src/app/shared/error-page/error-page.component';

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

  // Password-image inputs
  image = '';
  urlImage = '';
  author = '';

  // Password-gen inputs
  password = '';
  passwordStrength = '';
  badge = '';

  constructor(
    private fv: FormValidatorService,
    private pass: PasswordService,
    public dialogAlert: MatDialog
  ) { };

  ngOnInit(): void {
    this.generatePassword();
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
    this.dialogAlert.open(ErrorPageComponent, {
      data: {
        lengthError: this.lengthError,
        checkboxError: this.checkboxError
      }
    });
  }
}
