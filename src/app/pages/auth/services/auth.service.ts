import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { LogedUser } from 'src/app/models/loged-user.interface';
import { TokenResponse, UserResponse } from 'src/app/models/response.interface';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = `${environment.URL}users.routes/`;
  private logedUser!: LogedUser;

  get getUser() {
    return { ...this.logedUser }
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.urlBase}login`;
    const headers = new HttpHeaders({ email, password });

    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        tap(res => {
          if (res.status) {
            localStorage.setItem('passToken', res.token!)
            this.logedUser = {
              id: res.user.id,
              username: res.user.username!
            };
          }
        }),
        map(res => res.status)
      );
  }

  register(name: string, username: string, email: string, password: string) {
    const url = `${this.urlBase}register`;
    const body = { name, email, username, password };

    return this.http.post<UserResponse>(url, body)
      .pipe(
        tap(res => {
          if (res.status) localStorage.setItem('passToken', res.token!)
        })
      );
  }

  validateToken() {
    const url = `${this.urlBase}renew-token`;
    const headers = new HttpHeaders({ 'x-token': localStorage.getItem('passToken') || '' });
    return this.http.get<TokenResponse>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('passToken', res.token!)
          this.logedUser = {
            id: res.userId,
            username: res.username
          };
          return true;
        }),
        catchError(error => of(false))
      );
  }

}
