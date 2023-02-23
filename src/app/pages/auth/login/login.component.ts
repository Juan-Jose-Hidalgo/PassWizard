import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//* SERVICES.
import { AuthService } from '../../../services/auth.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';



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
    private auth: AuthService,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private router: Router
  ) { }

  getErrorMsg(controlName: string) {
    return this.fv.getErrorMsg(controlName, this.loginForm)
  }

  login() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password)
      .subscribe((_) => this.router.navigateByUrl('mis-passwords'));
  }
}
