import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


import { handleError } from 'src/app/helpers/alert-error.helper';

import { LogedUser } from 'src/app/models/loged-user.interface';
import { TokenResponse, UserResponse } from 'src/app/models/response.interface';

import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = `${environment.URL}users.routes/`;
  private logedUser: User;
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {
    this.logedUser = {
      id: -1,
      name: '',
      username: "",
      email: "",
      img: '',
      password: "",
    };

    if (localStorage.getItem('passToken')) {
      const { id, username, img } = this.getPayloadFromToken();
      this.logedUser.id = id;
      this.logedUser.img = img;
      this.logedUser.username = username;
    }
  }

  get getUser() {
    return this.logedUser;
  }

  setUser(user: User) {
    this.logedUser = { ...user };
  }

  getPayloadFromToken(): any {
    const passToken = localStorage.getItem('passToken');

    if (!passToken) return null;

    const payload = this.jwtHelper.decodeToken(passToken);
    return payload;
  }

  login(email: string, password: string) {
    const url = `${this.urlBase}login`;
    const headers = new HttpHeaders({ email, password });

    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        tap(res => {
          if (res.status) {
            localStorage.setItem('passToken', res.token!);
            this.logedUser = res.user;
          }
        }),
        map(res => res.status)
      );
  }

  /**
   * Registers a new user on the server.
   * 
   * @param name The user's full name.
   * @param username The desired username.
   * @param email The user's email address.
   * @param password The desired password.
   * @param img The user's profile.
   * @returns An Observable that emits the server response as a UserResponse object.
   */
  register(name: string, username: string, email: string, password: string, img: File): Observable<UserResponse> {
    const formData = new FormData();

    formData.set('name', name);
    formData.set('username', username);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('img', img);

    return this.http.post<UserResponse>(`${this.urlBase}register`, formData)
      .pipe(
        tap(({ status, token, user }: UserResponse) => {
          if (status) {
            localStorage.setItem('passToken', token!);
            this.logedUser = user;
          }
        }),
        catchError(handleError)
      );
  }

  deleteAccout(id: string) {
    const url = `${this.urlBase}${id}/delete-account`;
    return this.http.delete(url).pipe(
      tap((_) => {
        localStorage.removeItem('passToken');
        this.logedUser = {
          id: -1,
          name: '',
          username: "",
          email: "",
          img: '',
          password: "",
        };

      }),
      catchError(handleError)
    )
  }

  validateToken() {
    const url = `${this.urlBase}renew-token`;
    const headers = new HttpHeaders({ 'x-token': localStorage.getItem('passToken') || '' });
    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('passToken', res.token!)
          this.logedUser = res.user;
          return true;
        }),
        catchError(error => of(false))
      );
  }

  logout() {
    localStorage.removeItem('passToken');
    this.logedUser = {
      id: -1,
      name: '',
      username: "",
      email: "",
      img: '',
      password: "",
    }
  }

}
