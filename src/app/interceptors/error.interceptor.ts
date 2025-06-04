import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ein unbekannter Fehler ist aufgetreten';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = 'Ungültige Anfrage';
            break;
          case 401:
            errorMessage = 'Nicht autorisiert';
            router.navigate(['/']);
            break;
          case 403:
            errorMessage = 'Zugriff verweigert';
            break;
          case 404:
            errorMessage = 'Ressource nicht gefunden';
            break;
          case 500:
            errorMessage = 'Serverfehler';
            break;
          default:
            errorMessage = `Fehler Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};