import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CategoryResponse, PasswordResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = `${environment.URL}users.routes/`;

  constructor(
    private http: HttpClient
  ) { }

  getUserPasswords(id: number) {
    const url = `${this.urlBase}${id}/get-passwords`;
    return this.http.get<PasswordResponse>(url)
      .pipe(
        map(res => res.passwords)
      );
  }

  getUserCategories(id: number) {
    const url = `${this.urlBase}${id}/get-categories`;
    return this.http.get<CategoryResponse>(url)
      .pipe(
        map(res => res.categories)
      );
  }
}
