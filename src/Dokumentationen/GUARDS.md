# 3. 🛡️ /guards - Route Guards

## Was sind Guards?

Guards schützen Routen vor unbefugtem Zugriff und prüfen Bedingungen vor der Navigation.

## Dateien:

- `auth.guard.ts` - Authentifizierung
- `page-guard.guard.ts` - Seitenschutz für Badkonfigurator
- `route.guard.ts` - Allgemeiner Routenschutz

## 📝 Detaillierte Beschreibung:

### 🔐 AuthGuard

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  // Momentan: Alle haben Zugang
  // TODO: Echte Authentifizierung implementieren
  return true;
};
```

- **Zweck:** Schutz vor unauthorisierten Zugriffen
- **Status:** Aktuell inaktiv (return true)
- **Zukunft:** Integration mit AuthService geplant

### 📄 PageGuard

```typescript
@Injectable({ providedIn: 'root' })
export class PageGuard implements CanActivate {
  // Prüft Badkonfigurator-Fortschritt
}
```

- **Zweck:** Verhindert Sprünge im Badkonfigurator
- **Logik:**
  - Seite 1: Immer erlaubt
  - Seite 2: Nur wenn Ausstattung gewählt
  - Seite 3: Nur wenn Qualität gewählt
  - Seite 4: Nur wenn Fliesen gewählt
  - Seite 5: Nur wenn Heizung gewählt

### 🔒 RouteGuard

```typescript
@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
  // Allgemeiner Routenschutz
  return true; // Aktuell inaktiv
}
```

## 🎯 Implementierung in Routen:

```typescript
const routes: Routes = [
  {
    path: 'badrechner/page/:page',
    component: BadrechnerPageComponent,
    canActivate: [PageGuard]  // Guard anwenden
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]  // Auth erforderlich
  }
];
```