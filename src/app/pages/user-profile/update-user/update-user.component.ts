import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//* ANGULAR MATERIAL
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

//* SERVICES
import { FormValidatorService } from 'src/app/services/form-validator.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  updateForm: FormGroup = this.fb.group({
    name: [this.data.name, Validators.required],
    username: [this.data.username, Validators.required],
    email: [this.data.email, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private fb: FormBuilder,
    private fv: FormValidatorService,
    private us: UserService
  ) { }

  getErrorMsg(controlName: string) {
    return this.fv.getErrorMsg(controlName, this.updateForm);
  }

  /**

Updates user data in the server.
If form is invalid, marks all fields as touched.
@returns Nothing.
*/

  /**
   * Updates user data in the server.
   * If form is invalid, marks all fields as touched.
   * 
   * @return void.
   */
  update() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    const { name, username, email } = this.updateForm.value;
    
    // Calls the updateUser method of the UserService to update the user data.
    this.us.updateUser(this.data.userId, name, username, email)
      .subscribe(res => {
        this.authService.setUser(res.user);
      })
  }
}
