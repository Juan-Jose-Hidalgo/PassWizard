import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidateGuard implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.auth.validateToken().pipe(
      tap(res => {
        if (!res) this.router.navigateByUrl('/acceder');
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.auth.validateToken().pipe(
      tap(res => {
        if (!res) this.router.navigateByUrl('/acceder');
      })
    );
  }
}
