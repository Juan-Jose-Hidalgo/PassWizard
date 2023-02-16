import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  categoryForm: FormGroup = this.fb.group({
    name: [, Validators.required]
  });

  result: any = { name: '' }

  constructor(
    private fb: FormBuilder
  ) { }

  newCategory() {
    const { name } = this.categoryForm.value;
    return this.result = { name }
  }
}
