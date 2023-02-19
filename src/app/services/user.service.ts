import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CategoryResponse, PasswordResponse, UserResponse } from '../models/response.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = `${environment.URL}`;
  

  constructor(
    private http: HttpClient
  ) { }

  getUser(id: number) {
    const url = `${this.urlBase}users.routes`;
    const headers = new HttpHeaders({ id: `${id}` });
    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        map(res => res.user)
      );
  }

  getUserPasswords(id: number) {
    const url = `${this.urlBase}users.routes/${id}/get-passwords`;
    return this.http.get<PasswordResponse>(url)
      .pipe(
        map(res => res.passwords)
      );
  }

  getUserCategories(id: number) {
    const url = `${this.urlBase}users.routes/${id}/get-categories`;
    return this.http.get<CategoryResponse>(url)
      .pipe(
        map(res => res.categories)
      );
  }

}
