import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs';

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
    const url = `${this.urlBase}users.routes?id=${id}`;
    return this.http.get<UserResponse>(url)
      .pipe(
        map(res => res.user),
        catchError(handleError)
      );
  }

  updateUser(id: number, name: string, username: string, password: string) {
    const url = `${this.urlBase}users.routes/${id}`;
    const body = { name, username, password };

    return this.http.put<UserResponse>(url, body).pipe(
      catchError(handleError)
    )
  }

  updateUserImg(id: number, img: File, olderImg: string) {
    const url = `${this.urlBase}users.routes/${id}/update-img`;
    const formData = new FormData();
    formData.set('img', img);
    formData.set('olderImg', olderImg);

    return this.http.patch<UserResponse>(url, formData).pipe(
      catchError(handleError)
    )
  }

  updateUserPassword(id: number, password: string) {
    const url = `${this.urlBase}users.routes/${id}/update-password`;
    const body = { password };

    return this.http.patch(url, body).pipe(
      catchError(handleError)
    );
  }

  //* PASSWORDS & CATEGORIES.

  getUserPasswords(id: number) {
    const url = `${this.urlBase}users.routes/${id}/get-passwords`;
    return this.http.get<PasswordResponse>(url)
      .pipe(
        map(res => res.passwords),
        catchError(handleError)
      );
  }

  getUserCategories(id: number) {
    const url = `${this.urlBase}users.routes/${id}/get-categories`;
    return this.http.get<CategoryResponse>(url)
      .pipe(
        map(res => res.categories),
        catchError(handleError)
      );
  }

}
