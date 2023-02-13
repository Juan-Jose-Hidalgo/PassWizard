import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { LogedUser } from 'src/app/models/loged-user.interface';
import { ResponseInterface } from 'src/app/models/response.interface';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = environment.URL;
  private logedUser!: LogedUser;

  get getUser() {
    return { ...this.logedUser }
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.urlBase}login`;
    const headers = new HttpHeaders({ email, password });

    return this.http.get<ResponseInterface>(url, { headers })
      .pipe(
        tap(res => {
          if (res.status) {
            localStorage.setItem('passToken', res.data.token!)
            this.logedUser = {
              id: res.data.user?.id!,
              username: res.data.user?.username!
            };
          }
        }),
        map(res => res.status)
      );
  }

  register(name: string, username: string, email: string, password: string) {
    const url = `${this.urlBase}register`;
    const body = { name, email, username, password };

    return this.http.post<ResponseInterface>(url, body)
      .pipe(
        tap(res => {
          if (res.status) localStorage.setItem('passToken', res.data.token!)
        })
      );
  }

  validateToken() {
    const url = `${this.urlBase}renew-token`;
    const headers = new HttpHeaders({ 'x-token': localStorage.getItem('passToken') || '' });
    return this.http.get<ResponseInterface>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('passToken', res.data.token!)
          this.logedUser = {
            id: res.data.userId!,
            username: res.data.username!
          };
          return true;
        }),
        catchError(error => of(false))
      );
  }

}
