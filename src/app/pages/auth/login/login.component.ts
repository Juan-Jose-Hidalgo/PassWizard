import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { RegisterComponent } from '../register/register.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.pattern(this.fv.emailPattern)]],
    password: [, Validators.required],
  });

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private fb: FormBuilder,
    private fv: FormValidatorService
  ) { }

  //* Errors MSG
  get emailMsg() {
    const error = this.loginForm.get('email')?.errors;
    if (error?.['required']) return 'El campo email es obligatorio.';
    if (error?.['pattern']) return 'Formato de correo no válido.';
    return '';
  }

  get passwordMsg() {
    const error = this.loginForm.get('password')?.errors;
    if (error?.['required']) return 'El campo password es obligatorio.';
    return '';
  }

  fieldInvalid(name: string) {
    this.fv.fieldInvalid('name', this.loginForm);
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password)
      .subscribe({
        next: (console.log),
        error: (error => console.log(error.error))
      });
  }

  registerDialog() {
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent, { minWidth: '25%' });
  }
}
