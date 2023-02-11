import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ResponseInterface } from 'src/app/models/response.interface';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = environment.URL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.urlBase}login`;
    const headers = new HttpHeaders({ email, password });

    return this.http.get<ResponseInterface>(url, { headers })
      .pipe(
        tap(res => {
          if (res.status) localStorage.setItem('passToken', res.data.token!)
        })
      );
  }

}
