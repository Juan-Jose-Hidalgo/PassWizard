import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//* ANGULAR MATERIAL
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//* SERVICES
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.scss']
})
export class UpdateUserPasswordComponent {

  passwordForm: FormGroup = this.fb.group({
    password: [, Validators.required],
    confirmPassword: [, Validators.required],
  }, {
    validators: [this.fv.comparePasswords('password', 'confirmPassword')]
  }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private us: UserService
  ) { }

  getErrorMsg(controlName: string) {
    return this.fv.getErrorMsg(controlName, this.passwordForm);
  }

  update() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { password } = this.passwordForm.value;
    this.us.updateUserPassword(this.data.id, password).subscribe();
  }
}
