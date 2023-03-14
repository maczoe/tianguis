import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.validaToken();
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
}
