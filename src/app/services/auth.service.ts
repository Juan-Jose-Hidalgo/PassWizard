import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Buffer } from 'buffer';

import { catchError, map, Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { handleError } from 'src/app/helpers/alert-error.helper';
import { UserResponse } from 'src/app/models/response.interface';
import { User } from 'src/app/models/user.interface';

import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = `${environment.URL}`;
  private logedUser!: User;
  private jwtHelper = new JwtHelperService();
  private isLoged = false;


  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get getUser() {
    return { ...this.logedUser };
  }

  get loged() {
    return this.isLoged;
  }

  setUser(user: User) {
    this.logedUser = { ...user };
    this.logedUser.img = `${this.urlBase}${user.img}`;
  }

  setLoged() {
    this.isLoged = true;
  }

  /**
   * Returns the decoded payload from the passToken stored in the local storage.
   * If there is no passToken or if it has expired, null is returned instead.
   * 
   * @returns The decoded payload from the passToken, or null if the token is invalid or expired.
   */
  getPayloadFromToken(): any {
    const passToken = localStorage.getItem('passToken');

    if (!passToken || this.jwtHelper.isTokenExpired(passToken)) {
      return null;
    }

    return this.jwtHelper.decodeToken(passToken);
  }

  /**
   * Authenticates a user by making a POST request to the login endpoint with the user's email and password as credentials.
   * The email and password are encoded in base64 and sent as headers to the server. If the authentication is successful,
   * the user's token and information are saved in local storage and in the logedUser property of the service.
   * 
   * @param email The user's email.
   * @param password The user's password.
   * @returns An Observable that emits a boolean indicating if the authentication was successful or not.
   * If successful, the boolean value is true. If unsuccessful, the boolean value is false.
   */
  login(email: string, password: string) {
    const url = `${this.urlBase}auth/login`;
    const authHeader = `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`;
    const headers = new HttpHeaders({ Authorization: authHeader });

    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        tap(res => {
          if (res.status) {
            localStorage.setItem('passToken', res.token!);
            this.setUser(res.user);
            this.isLoged = true;
          }
        }),
        map(res => res.status),
        catchError(handleError)
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

    return this.http.post<UserResponse>(`${this.urlBase}auth/register`, formData)
      .pipe(
        tap(({ status, token, user }: UserResponse) => {
          if (status) {
            localStorage.setItem('passToken', token!);
            this.setUser(user);
            this.isLoged = true;
          }
        }),
        catchError(handleError)
      );
  }

  /**
   * Sends a DELETE request to the server to delete the user account with the given id.
   * Removes the token from localStorage and logs out the user on success.
   * 
   * @param id The id of the user account to be deleted.
   * @returns An Observable that completes on success or emits an error.
   */
  deleteAccount(id: string) {
    const url = `${this.urlBase}users/${id}/delete-account`;
    return this.http.delete(url).pipe(
      tap((_) => this.logout()),
      catchError(handleError)
    )
  }

  /**
   * Validates a user token by sending a GET request to the 'renew-token' endpoint.
   * 
   * @returns A boolean value indicating if the token validation was successful.
   */
  validateToken() {
    const url = `${this.urlBase}auth/renew-token`;
    const headers = new HttpHeaders({ 'x-token': localStorage.getItem('passToken') || '' });
    return this.http.get<UserResponse>(url, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('passToken', res.token!)
          this.setUser(res.user);
          this.isLoged = true;
          return true;
        }),
        catchError(_err => of(false))
      );
  }

  logout() {
    localStorage.removeItem('passToken');
    this.isLoged = false;
  }

  checkToken() {
    if (localStorage.getItem('passToken')) this.isLoged = true;
    else this.isLoged = false;
  }
}
