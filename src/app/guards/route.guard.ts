import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Add route protection logic here
    // For example: check authentication, permissions, etc.
    return true;
  }
}