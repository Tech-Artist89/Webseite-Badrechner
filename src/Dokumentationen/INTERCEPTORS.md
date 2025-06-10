# 4. 🌐 /interceptors - HTTP Interceptors

## Was sind Interceptors?

Interceptors fangen HTTP-Requests ab und können diese modifizieren, Fehler behandeln oder Loading-States verwalten.

## Dateien:

- `error.interceptor.ts` - Fehlerbehandlung
- `http.interceptor.ts` - Request-Modifikation
- `loading.interceptor.ts` - Loading-Anzeige

## 📝 Detaillierte Beschreibung:

### ❌ ErrorInterceptor

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Fehlerbehandlung je nach Status-Code
    })
  );
};
```

**Status-Codes:**

- **400:** Ungültige Anfrage
- **401:** Nicht autorisiert → Weiterleitung zur Startseite
- **403:** Zugriff verweigert
- **404:** Ressource nicht gefunden
- **500:** Serverfehler

### 📡 HttpInterceptor

```typescript
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'  // Standard-Header
    }
  });
  return next(modifiedReq);
};
```

- **Zweck:** Fügt Standard-Headers hinzu
- **Erweiterbar:** Auth-Token, API-Keys etc.

### ⏳ LoadingInterceptor

```typescript
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  loadingService.show();  // Loading anzeigen
  
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();  // Loading verstecken
    })
  );
};
```

- **Automatisch:** Loading für alle HTTP-Requests
- **UI-Feedback:** Nutzer sieht Ladevorgang

## 🎯 Registrierung:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        errorInterceptor,
        httpInterceptor,
        loadingInterceptor
      ])
    )
  ]
};
```