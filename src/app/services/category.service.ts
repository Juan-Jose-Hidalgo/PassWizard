import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { handleError } from '../helpers/alert-error.helper';
import { CategoryResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase = `${environment.URL}categories`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Creates a new category by sending a POST request to the server with the specified name and user ID.
   * 
   * @param userId The ID of the user who is creating the category.
   * @param name The name of the new category to be created.
   * @returns An observable emitting a CategoryResponse object.
   */
  newCategory(userId: number, name: string) {
    const body = { name, userId }
    return this.http.post<CategoryResponse>(this.urlBase, body).pipe(
      catchError(handleError)
    );
  }
}
