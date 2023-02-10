import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataPassword } from '../models/data-password.interface';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  /**
   * Check if at least one of the checkboxes is active.
   * 
   * @param data ```dataPassword``` Object with the data to be evaluated.
   * @returns ```boolean```
   */
  checkboxIsValid(data: DataPassword) {
    const { lowerCase, upperCase, numbers, symbols } = data;
    if (!lowerCase && !upperCase && !numbers && !symbols) return false;
    return true;
  }

  /**
   * Check if the length parameter is correct.
   * 
   * @param length Length to be evaluated.
   * @returns ```boolean```
   */
  lengthIsValid(length: number) {
    if (length < 8 || length > 16 || length === null) return false;
    return true;
  }

  fieldInvalid(name: string, form: FormGroup) {
    return form.controls[name]?.errors && form.controls[name]?.touched;
  }
}
