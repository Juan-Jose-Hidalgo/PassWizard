import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';
import errorTranslate from 'src/app/helpers/errorTranslate.helper';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    name: [, Validators.required],
    username: [, Validators.required],
    email: [, [Validators.required, Validators.pattern(this.fv.emailPattern)]],
    password: [, Validators.required],
    confirmPassword: [, Validators.required],
  }, {
    validators: [this.fv.comparePasswords('password', 'confirmPassword')]
  });

  constructor(
    private auth: AuthService,
    private catService: CategoryService,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private router: Router
  ) { }

  //* Errors MSG
  get nameMsg() {
    const error = this.registerForm.get('name')?.errors;
    return (error?.['required']) ? 'El campo nombre es obligatorio' : '';
  }

  get usernameMsg() {
    const error = this.registerForm.get('username')?.errors;
    return (error?.['required']) ? 'El campo nombre de usuario es obligatorio' : '';
  }

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

  get confirmPasswordMsg() {
    const error = this.registerForm.get('confirmPassword')?.errors;
    if (error?.['required']) return 'Tienes que confirmar la contraseña.';
    if (error?.['diffPass']) return 'Las contraseñas no coinciden';
    return '';
  }

  register() {
    if (this.registerForm.invalid) return;

    const { name, username, email, password } = this.registerForm.value;
    this.auth.register(name, username, email, password)
      .subscribe({
        next: (_) => {
          const username = this.auth.getUser.username;
          const userId = this.auth.getUser.id;
          this.catService.newCategory(userId, 'Sin Categoría').subscribe();
          this.router.navigateByUrl(`mis-passwords/${username}`);
        },
        error: (error => {
          console.log(error);
          const errorMsg = errorTranslate(error.error.data.error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMsg,
          })
        })
      });
  }

}
