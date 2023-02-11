import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
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
    const error = this.registerForm.get('email')?.errors;
    if (error?.['required']) return 'El campo email es obligatorio.';
    if (error?.['pattern']) return 'Formato de correo no válido.';
    return '';
  }

  get passwordMsg() {
    const error = this.registerForm.get('password')?.errors;
    if (error?.['required']) return 'El campo password es obligatorio.';
    return '';
  }

  fieldInvalid(name: string) {
    this.fv.fieldInvalid('name', this.registerForm);
  }

  login() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;
    this.auth.login(email, password)
      .subscribe({
        next: (console.log),
        error: (error => console.log(error.error))
      });
  }

  loginDialog() {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent, { minWidth: '25%' });
  }
  
}
