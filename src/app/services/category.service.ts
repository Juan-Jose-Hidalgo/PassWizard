import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CategoryResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase = `${environment.URL}categories.routes`;

  constructor(
    private http: HttpClient
  ) { }

  newCategory(userId: number, name: string) {
    const body = { name, userId }
    return this.http.post<CategoryResponse>(this.urlBase, body);
  }
}
