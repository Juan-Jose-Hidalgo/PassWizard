import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { encrypt } from '../helpers/crypto.helper';
import { handleError } from '../helpers/alert-error.helper';
import { DataPassword } from '../models/data-password.interface';
import { PasswordInterface } from '../models/passwords.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private urlBase = `${environment.URL}passwords.routes`;

  constructor(
    private http: HttpClient
  ) { }

  //* CREATE PASSWORD METHODS.
  /**
   * Adds required characters to the password and fills the values array with them.
   * 
   * @param data - The data object containing the password requirements.
   * @param values - The array to add the required characters to.
   * @param password - The password array to add the required characters to.
   * @return The number of checks added to the password.
   * 
   * @description
   * This function adds the required characters to the password based on the requirements specified in the data object.
   * It also fills the values array with these characters.
   * The function returns the number of checks added to the password.
   */
  private addRequiredCharacters(data: DataPassword, values: string[], password: string[]): number {
    let checks = 0;
    if (data.numbers) {
      checks += this.fillValuesAndAddCharacter('0123456789', values, password);
    }
    if (data.lowerCase) {
      checks += this.fillValuesAndAddCharacter('abcdefghijklmnopqrstuvwxyz', values, password);
    }
    if (data.upperCase) {
      checks += this.fillValuesAndAddCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ', values, password);
    }
    if (data.symbols) {
      checks += this.fillValuesAndAddCharacter('@#$%&)_@#$%&)_@#$%&)_', values, password);
    }
    return checks;
  }

  /**
  * Fills the given values array with the characters of a string and adds a random character to the password.
  *
  * @param variable - The string to extract the characters from.
  * @param values - The array to add the extracted characters to.
  * @param password - The password array to add the random character to.
  * @returns The number of checks added to the password.
  *
  * @description
  * This function extracts the characters of a string and adds them to the given values array.
  * It also adds a random character from the string to the given password array.
  * The function returns the number of checks added to the password, which is always 1.
  */
  private fillValuesAndAddCharacter(variable: string, values: string[], password: string[]): number {
    values.push(...variable.split(''));
    const characterIndex = Math.floor(Math.random() * variable.length);
    password.push(variable.charAt(characterIndex));
    return 1;
  }

  /**
  * Shuffles the elements of an array in a random order to increase password security.
  *
  * @param arr - The array to shuffle.
  * @returns A new array with the same elements as the original array, but in a random order.
  *
  * @description
  * This function shuffles the elements of an array in a random order to increase password security.
  * It iterates over the array and randomly swaps the elements at each position with another element in the array.
  * The function returns a new array with the same elements as the original array, but in a random order.
  */
  private unOrderedArray(arr: any[]) {
    const shuffledArray = [...arr]; // Create a copy of the original array.

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));// Select a random index.

      // swap the elements at positions i and j using array destructuring
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  /**
  * Checks the strength of a password based on its length and the number of criteria that it meets.
  *
  * @param password - The password to check.
  * @param checks - The number of password strength criteria that the password meets.
  * @returns A string indicating the strength of the password: 'strong', 'medium', or 'weak'.
  *
  * @description
  * This function takes in a password string and the number of password strength criteria that the password meets, and returns
  * a string indicating the password strength based on its length and the number of criteria that it meets.
  */
  chekStrongPassword(password: string, checks: number): string {
    if (password.length >= 14 && checks === 4) return 'fuerte';

    if (password.length >= 11 && checks >= 3) return 'media';

    return 'débil';
  }

  /**
   * Generates a password of a specified length that meets certain criteria.
   * 
   * @param data - An object containing data necessary for generating a password.
   * @returns An object containing the generated password and the number of criteria that it meets.
   * 
   * @description
   * This function generates a password of a specified length that meets certain criteria (such as containing uppercase letters,
   * lowercase letters, numbers, and/or symbols). It does this by first adding the required characters to the password, then
   * adding random characters from a pool of characters until the desired length is reached, and finally shuffling the characters
   * in the password to ensure greater security.
   */
  generatePassword(data: DataPassword): { password: string; checks: number; } {
    const { length } = data;
    const values: string[] = [];
    let password: string[] = [];

    // Add required characters
    const checks = this.addRequiredCharacters(data, values, password);

    // Add remaining characters
    for (let i = 0; i < length - checks; i++) {
      const index = Math.floor(Math.random() * values.length);
      password.push(values[index]);
    }

    // Shuffle password
    password = this.unOrderedArray(password);

    return { password: password.join(''), checks };
  }

  //* HTTP Methods.

  deleteUserPassword(id: number) {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete(url).pipe(
      catchError(handleError)
    );
  }

  /**
   * Send a POST request to the server to create a new password for an user.
   * @param userId - The ID of the user to create the password for.
   * @param categoryId - The ID of the category for the new password.
   * @param name - The name of the new password.
   * @param pass - The value of the new password to be encrypted.
   * @returns An Observable of the created password object.
   * 
   * @description
   * This function sends a POST request to the server to create a new password for the specified user.
   * The function encrypts the password before sending the request.
   * The function returns an Observable of the created password object.
   * If there is an error, the function calls the `handleError` function to handle it.
   */
  newUserPassword(userId: number, categoryId: number, name: string, pass: string) {
    pass = encrypt(pass);
    const body = { userId, categoryId, name, pass };

    return this.http.post<PasswordInterface>(this.urlBase, body).pipe(
      catchError(handleError)
    )
  }

  updateUserPassword(id: number, name: string, pass: string, categoryId: number) {
    const url = `${this.urlBase}/${id}`;
    pass = encrypt(pass);
    const body = { categoryId, name, pass }
    return this.http.put(url, body).pipe(
      catchError(handleError)
    );
  }
}
