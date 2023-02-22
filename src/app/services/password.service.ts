import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { encrypt } from '../helpers/crypto.helper';
import { checkedPassword } from '../models/checked-password.interface';
import { DataPassword } from '../models/data-password.interface';
import { PasswordInterface } from '../models/password.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private urlBase = `${environment.URL}passwords.routes`;

  private variables = {
    num: '0123456789',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symb: '@#$%&)_@#$%&)_@#$%&)_'
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Receives an object of type ```dataPassword``` with the necessary data to
   * generate a random password and returns it with the number of options marked by the user.
   * 
   * @param data ```dataPassword``` Object with the data to create the password.
   * @returns ```{password, numberOfChecks}```
   */
  generatePassword(data: DataPassword) {
    const { length, upperCase, lowerCase, symbols, numbers } = data;
    let values: any[] = [];
    let password: any[] = [];
    let checks = 0;

    if (numbers) {
      ({ values, password, checks } = this.valuesPassword(this.variables.num, values, password, checks));
    }
    if (lowerCase) {
      ({ values, password, checks } = this.valuesPassword(this.variables.lower, values, password, checks))
    }
    if (upperCase) {
      ({ values, password, checks } = this.valuesPassword(this.variables.upper, values, password, checks));
    }
    if (symbols) {
      ({ values, password, checks } = this.valuesPassword(this.variables.symb, values, password, checks));
    }

    //Unorder the array.
    values = this.unOrderedArray(values);
    const max = values.length;
    const limitFor = length - password.length;

    for (let i = 0; i < limitFor; i++) {
      const index = Math.floor(Math.random() * max);
      password.push(values[index]);
    }

    return { password: this.unOrderedArray(password).join(''), checks };
  }

  /**
   * Checks the strength of a password according to the following criteria:
   * - Strong password:
   *     - 4 checks.
   *     - Length 14 to 16.
   * - Medium password:
   *     - At least 3 checks.
   *     - Length 11 to 13.
   * - Weak password: when neither of the above cases are met.
   * 
   * Returns an object of type ```checkedPassword``` with the strength of the password,
   * the associated image, the url of the image and its author.
   * 
   * @param password ```string``` Password to check (string).
   * @param checks ```number``` Number of options marked by the user.
   * @returns ```checkedPassword``` Object with password info.
   */
  chekStrongPassword(password: string, checks: number): string {
    if (password.length >= 14 && checks === 4) return 'fuerte';

    if (password.length >= 11 && checks >= 3) return 'media';

    return 'débil';
  }

  /**
   * Fills the array of values with the characters needed to create the password.
   * Fill to the password variable a character of the required type.
   * 
   * @param variable ```string``` Contains the type of characters needed to create the password.
   * @param values ```any[]``` Array that will contain the characters needed to create the password.
   * @param password ```any[]``` Array containing the initial password characters.
   * @returns  ```{values, password}``` An object with values and password.
   */
  private valuesPassword(variable: string, values: any[], password: any[], checks: number) {
    const max = variable.length;
    const characterIndex = Math.floor(Math.random() * (max - 1));

    values = [...values, ...variable.split('')];
    password = [...password, variable.charAt(characterIndex)];
    checks++;

    return { values, password, checks }
  }

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param arr The array to shuffle.
   * @returns A new array with the same elements in a random order.
   */
  unOrderedArray(arr: any[]) {
    const shuffledArray = [...arr]; // Create a copy of the original array.

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));// Select a random index.

      // swap the elements at positions i and j using array destructuring
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  newUserPassword(userId: number, categoryId: number, name: string, pass: string) {
    pass = encrypt(pass);
    const body = { userId, categoryId, name, pass };

    return this.http.post<PasswordInterface>(this.urlBase, body)
  }

  deleteUserPassword(id: number) {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete(url);
  }

  updateUserPassword(id: number, name: string, pass: string, categoryId: number) {
    const url = `${this.urlBase}/${id}`;
    pass = encrypt(pass);
    const body = { categoryId, name, pass }
    return this.http.put(url, body);
  }
}
