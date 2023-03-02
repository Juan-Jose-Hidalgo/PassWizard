import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { handleError } from '../helpers/alert-error.helper';
import { CategoryResponse, PasswordResponse, UserResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = `${environment.URL}`;

  constructor(
    private http: HttpClient
  ) { }

  //* PERSONAL INFO.
  /**
   * Returns the details of a specific user.
   * 
   * @param id The ID of the user to retrieve.
   * @returns An observable of type User that contains the details of the user.
   */
  getUser(id: number) {
    const url = `${this.urlBase}users/${id}`;
    return this.http.get<UserResponse>(url)
      .pipe(
        map(res => res.user),
        catchError(handleError)
      );
  }

  updateUser(id: number, name: string, username: string, email: string) {
    const url = `${this.urlBase}users/${id}`;
    const body = { name, username, email };

    return this.http.put<UserResponse>(url, body).pipe(
      catchError(handleError)
    )
  }

  /**
   * Sends a PATCH request to update the user image.
   * 
   * @param id - The ID of the user whose image is being updated.
   * @param img - The new image to be uploaded.
   * @param olderImg - The name of the previous image.
   * 
   * @returns An Observable of the UserResponse with updated user information.
   * @description Updates the user image by sending a patch request to the API with
   * the user id, new image file and older image path.
   * Returns an observable with the updated user data if successful or an error if failed.
   */
  updateUserImg(id: number, img: File, olderImg: string) {
    const url = `${this.urlBase}users/${id}/update-img`;

    const formData = new FormData();
    formData.append('img', img);
    formData.append('olderImg', olderImg);

    return this.http.patch<UserResponse>(url, formData).pipe(
      catchError(handleError)
    )
  }

  updateUserPassword(id: number, password: string) {
    const url = `${this.urlBase}users/${id}/update-password`;
    const body = { password };

    return this.http.patch(url, body).pipe(
      catchError(handleError)
    );
  }

  //* PASSWORDS & CATEGORIES.
  /**
   * Retrieves a user's stored passwords from the server.
   * 
   * @param id - The ID of the user.
   * @returns An Observable that emits an array of Password objects retrieved from the server.
   */
  getUserPasswords(id: number) {
    const url = `${this.urlBase}users/${id}/get-passwords`;
    return this.http.get<PasswordResponse>(url)
      .pipe(
        map(res => res.passwords),
        catchError(handleError)
      );
  }

  /**
   * Retrieves the categories of a user with the specified ID.
   * 
   * @param id - The ID of the user whose categories will be retrieved.
   * @returns An observable that emits an array of Category objects associated with the user.
   */
  getUserCategories(id: number) {
    const url = `${this.urlBase}users/${id}/get-categories`;
    return this.http.get<CategoryResponse>(url)
      .pipe(
        map(res => res.categories),
        catchError(handleError)
      );
  }

}
