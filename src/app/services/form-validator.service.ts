import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  /**
  * Checks if the specified length is valid.
  *
  * @param length The length to be checked.
  * @returns A boolean value indicating if the length is valid.
  */
  lengthIsValid(length: number): boolean {
    return length != null && length >= 8 && length <= 16;
  }

  /**
   * Checks if a form field is valid.
   * 
   * @param name The name of the form field.
   * @param form The FormGroup object containing the form fields.
   * @returns A boolean value indicating if the field is valid.
   */
  fieldInvalid(name: string, form: FormGroup) {
    return form.controls[name]?.errors && form.controls[name]?.touched;
  }

  /**
   * Compares two password fields in a form to ensure they match.
   * 
   * @param pass1 The name of the first password field.
   * @param pass 2 The name of the second password field.
   * @returns A validation function for the password fields.
   * 
   * @description Takes the names of the two password fields as arguments 
   * and returns a validation function for the password fields. The validation
   * function checks if the two password fields match and sets a validation error
   * on the secondary password field if they don't match. If the fields match,
   * any validation error on the secondary password field is cleared.
   */
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

  /**
   * Validates if an image file has a valid extension.
   * 
   * @param field The name of the image field to validate.
   * @returns A validation function for the image field.
   * 
   * @description Takes the name of the image field as argument and returns a validation
   * function for the image field.
   * The returned validation function checks if the image file extension is valid. If it's not,
   * it sets a validation error on the image field and returns a validation error object
   * a validation error indicating that the image is invalid. If the extension is valid, it returns null.
   */
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
