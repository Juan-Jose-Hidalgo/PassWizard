import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { DataPassword } from '../models/data-password.interface';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

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

  comparePasswords(pass1: string, pass2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value1 = control.get(pass1)?.value;
      const value2 = control.get(pass2)?.value;

      if (value1 !== value2) {
        control.get(pass2)?.setErrors({ diffPass: true });
        return { diffPass: true };
      }

      control.get('pass2')?.setErrors({ diffPass: false });
      return null;
    }
  }

  imageValidator(field: string) {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    
    return (control: AbstractControl): ValidationErrors | null => {

      const file = control.get(field)?.value;
      if (!file) return null;

      const extension = file.split('.').pop()?.toLowerCase()!;
      if (!allowedExtensions.includes(extension)) {
        control.get(field)?.setErrors({ invalidImg: true });
        return { invalidImg: true };
      }
      return null
    }
  }

  /**
   * Returns an error message for a given control name in a reactive form.
   * 
   * @param controlName The name of the control to retrieve the error message for.
   * @returns The error message for the specified control, or an empty string if there are no errors.
   */
  getErrorMsg(controlName: string, form: FormGroup) {
    // Get the errors for the specified control.
    const error = form.get(controlName)?.errors;

    // Define a dictionary mapping error keys to error messages.
    const messages: Record<string, string> = {
      required: `El campo ${controlName} es obligatorio`,
      pattern: `Formato de ${controlName} no válido`,
      diffPass: `Las contraseñas no coinciden`,
      invalidImg: `Solo se permiten imágenes .jpeg, .jpg y .png`
    };

    // Map the error keys to their corresponding messages if they exist, and filter out any that are falsy.
    return Object.keys(messages)
      .map((key) => error?.[key] && messages[key])
      .filter(Boolean)
      .join('. ');
  }
}
