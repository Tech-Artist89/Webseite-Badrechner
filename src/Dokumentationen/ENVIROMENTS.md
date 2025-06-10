# 2. 🌍 /environments - Umgebungskonfiguration

## Was sind Environments?

Environments definieren verschiedene Konfigurationen für Development und Production.

## Dateien:

- `environment.ts` (Development)
- `environment.prod.ts` (Production)

## 📝 Konfiguration:

### 🔧 Development (environment.ts)

```typescript
export const environment = {
  production: false,           // Entwicklungsmodus
  apiUrl: 'http://localhost:3000/api',  // Lokale API
  appName: 'Mitra Sanitär GmbH',
  version: '1.0.0',
  features: {
    analytics: false,          // Keine Analytics im Dev
    logging: true              // Debug-Logs aktiviert
  }
};
```

### 🚀 Production (environment.prod.ts)

```typescript
export const environment = {
  production: true,            // Produktionsmodus
  apiUrl: 'https://api.mitra-sanitaer.de',  // Live API
  appName: 'Mitra Sanitär GmbH',
  version: '1.0.0',
  features: {
    analytics: true,           // Analytics aktiviert
    logging: false             // Keine Debug-Logs
  }
};
```

## 🎯 Verwendung:

```typescript
import { environment } from '../environments/environment';

// API-Aufrufe
const apiUrl = environment.apiUrl;

// Feature-Flags
if (environment.features.analytics) {
  // Analytics Code
}
```