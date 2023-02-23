import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//* SERVICES.
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { FormValidatorService } from 'src/app/services/form-validator.service';

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
    img: [],
    password: [, Validators.required],
    confirmPassword: [, Validators.required],
  }, {
    validators: [
      this.fv.comparePasswords('password', 'confirmPassword'),
      this.fv.imageValidator('img')
    ]
  });

  img!: File;

  constructor(
    private auth: AuthService,
    private catService: CategoryService,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private router: Router
  ) { }


  getErrorMsg(controlName: string) {
    return this.fv.getErrorMsg(controlName, this.registerForm)
  }

  imgSelec(event: any): void {
    if (event.target?.files && event.target.files[0]) this.img = <File>event.target.files[0];
  }

  register() {
    if (this.registerForm.invalid) return;

    const { name, username, email, password } = this.registerForm.value;

    this.auth.register(name, username, email, password, this.img)
      .subscribe((_) => {
        const userId = this.auth.getUser.id;
        this.catService.newCategory(userId, 'Sin Categoría').subscribe();
        this.router.navigateByUrl('mis-passwords');
      });
  }

}
