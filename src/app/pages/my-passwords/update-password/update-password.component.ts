import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
  index = this.data.categoryIndex;
  categories = this.data.categories;

  updateForm: FormGroup = this.fb.group({
    category: [this.categories[this.index].id, Validators.required],
    name: [this.data.name, Validators.required],
    password: [this.data.password]
  });

  result: any = {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  update() {
    const { name, password, category } = this.updateForm.value;
    return this.result = { name, password, category }
  }
}
