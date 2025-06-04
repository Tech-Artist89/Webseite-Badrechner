import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Implementierung für Authentifizierung
  // Momentan erlaubt es allen Zugang
  // Bei Bedarf hier Authentifizierungslogik hinzufügen:
  
  // Beispiel für Authentifizierung:
  // const authService = inject(AuthService);
  // if (!authService.isAuthenticated()) {
  //   router.navigate(['/login']);
  //   return false;
  // }
  
  return true;
};