import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  categorySelected = this.data.categories[0];

  categoryForm: FormGroup = this.fb.group({
    category: [this.categorySelected.id, Validators.required],
    name: [this.data.name, Validators.required],
    password: [this.data.password]
  });

  result: any = { name: this.data.name, password: this.data.password, category: this.categorySelected.id }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  newPass() {
    const { name, password, category } = this.categoryForm.value;
    return this.result = { name, password, category }
  }
}
