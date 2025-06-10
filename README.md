# MitraSanitaer

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# 📚 Mitra Sanitär GmbH - Projekt Dokumentation

> Willkommen zur vollständigen Dokumentation der Angular-Website für Mitra Sanitär. Diese README hilft Entwicklern dabei, sich schnell im Projekt zurechtzufinden.

## 🚀 Projekt-Übersicht

Die Mitra Sanitär Website ist eine moderne Angular-Anwendung mit einem interaktiven **5-Schritt-Badkonfigurator** als Hauptfeature. Das Projekt verwendet:

- **Angular** (Standalone Components)
- **TypeScript** mit strikter Typisierung
- **SCSS/Sass** für modernes Styling
- **Bootstrap** als CSS-Framework
- **FontAwesome** für Icons
- **Responsive Design** (Mobile First)

---

## 📁 Dokumentations-Struktur

Alle Dokumentationen befinden sich im Ordner `src/Dokumentationen/` und sind thematisch organisiert:

### 🔧 Angular Architektur

| Datei | Beschreibung | Zielgruppe |
|-------|-------------|------------|
| [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) | **Vollständige Komponenten-Dokumentation** - Alle 24 Komponenten mit Code-Beispielen | Entwickler (alle Level) |
| [`SERVICES.md`](src/Dokumentationen/SERVICES.md) | **Angular Services** - 9 Services für Datenmanagement und Business Logic | Entwickler |
| [`PAGES.md`](src/Dokumentationen/PAGES.md) | **Alle Seiten der Website** - 13 Haupt-Pages mit Routing und Navigation | Entwickler & Designer |
| [`DIRECTIVES.md`](src/Dokumentationen/DIRECTIVES.md) | **Custom Direktiven** - 5 Direktiven für erweiterte Funktionalität | Fortgeschrittene |
| [`PIPES.md`](src/Dokumentationen/PIPES.md) | **Custom Pipes** - 3 Pipes für Datenformatierung | Entwickler |
| [`GUARDS.md`](src/Dokumentationen/GUARDS.md) | **Route Guards** - Schutz und Navigation im Badkonfigurator | Backend-Entwickler |
| [`INTERCEPTORS.md`](src/Dokumentationen/INTERCEPTORS.md) | **HTTP Interceptors** - Error Handling, Loading States | Backend-Entwickler |

### 📊 Datenstrukturen

| Datei | Beschreibung | Zielgruppe |
|-------|-------------|------------|
| [`INTERFACES.md`](src/Dokumentationen/INTERFACES.md) | **TypeScript Interfaces** - Badkonfigurator Datenstrukturen | Entwickler |
| [`MODELS.md`](src/Dokumentationen/MODELS.md) | **Datenmodelle** - Contact, Service, Team Member Models | Entwickler |
| [`ENVIROMENTS.md`](src/Dokumentationen/ENVIROMENTS.md) | **Umgebungskonfiguration** - Development vs. Production | DevOps & Entwickler |

### 🎨 Styling & Design

| Datei | Beschreibung | Zielgruppe |
|-------|-------------|------------|
| [`StyleDokumentation/GLOBAL_STYLES.md`](src/Dokumentationen/StyleDokumentation/GLOBAL_STYLES.md) | **Globale Styles** - styles.scss, Bootstrap Overrides, Utilities | Designer & Entwickler |
| [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md) | **SCSS/Sass System** - Variables, Mixins, Animations, Components | Designer & Frontend |
| [`StyleDokumentation/SHARED_COMPONENTS.md`](src/Dokumentationen/StyleDokumentation/SHARED_COMPONENTS.md) | **Shared Component Styles** - 10 wiederverwendbare Komponenten | Frontend-Entwickler |
| [`StyleDokumentation/UI_COMPONENTS.md`](src/Dokumentationen/StyleDokumentation/UI_COMPONENTS.md) | **UI Component Styles** - 4 Haupt-UI-Komponenten | Frontend-Entwickler |
| [`StyleDokumentation/PAGES.md`](src/Dokumentationen/StyleDokumentation/PAGES.md) | **Page-spezifische Styles** - Styling für alle 13+ Seiten | Frontend-Entwickler |

---

## 🎯 Schnellstart für Entwickler

### 👶 Für Anfänger
1. **Start hier**: [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) - Verstehe das Komponenten-System
2. **Dann**: [`PAGES.md`](src/Dokumentationen/PAGES.md) - Lerne die Seitenstruktur kennen
3. **Styling**: [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md) - SCSS Grundlagen

### 🧑‍💻 Für erfahrene Entwickler
1. **Architektur**: [`SERVICES.md`](src/Dokumentationen/SERVICES.md) - Business Logic verstehen
2. **Datenstrukturen**: [`INTERFACES.md`](src/Dokumentationen/INTERFACES.md) + [`MODELS.md`](src/Dokumentationen/MODELS.md)
3. **Erweiterte Features**: [`DIRECTIVES.md`](src/Dokumentationen/DIRECTIVES.md) + [`GUARDS.md`](src/Dokumentationen/GUARDS.md)

### 🎨 Für Designer & Frontend
1. **Design System**: [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md)
2. **Komponenten-Styles**: [`StyleDokumentation/SHARED_COMPONENTS.md`](src/Dokumentationen/StyleDokumentation/SHARED_COMPONENTS.md)
3. **Responsive Design**: [`StyleDokumentation/GLOBAL_STYLES.md`](src/Dokumentationen/StyleDokumentation/GLOBAL_STYLES.md)

---

## 🛁 Badkonfigurator (Hauptfeature)

Der **5-Schritt-Badkonfigurator** ist das Herzstück der Anwendung:

### Schritt-für-Schritt Dokumentation:

| Schritt | Komponente | Zweck | Dokumentation |
|---------|------------|-------|---------------|
| **1** | `PageOneComponent` | Ausstattung auswählen (WC, Dusche, etc.) | [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) |
| **2** | `PageTwoComponent` | Qualitätsstufe wählen (Basic/Comfort/Premium) | [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) |
| **3** | `PageThreeComponent` | Fliesen und Materialien | [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) |
| **4** | `PageFourComponent` | Heizung und Belüftung | [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) |
| **5** | `PageFiveComponent` | Kontaktdaten und Angebot | [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) |

**Services für Badkonfigurator:**
- `BathroomDataService` - Datenmanagement
- `NavigationBadrechnerService` - Navigation zwischen Schritten
- `EmailService` - Versand der Konfiguration

Detaillierte Beschreibungen in [`SERVICES.md`](src/Dokumentationen/SERVICES.md)

---

## 📱 Responsive Design

Das Projekt folgt einem **Mobile-First** Ansatz:

### Breakpoints:
- **XS (0px+)**: Smartphones (Hochformat)
- **SM (576px+)**: Smartphones (Querformat)
- **MD (768px+)**: Tablets
- **LG (992px+)**: Desktop
- **XL (1200px+)**: Große Bildschirme

### Dokumentation:
- **System**: [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md)
- **Utilities**: [`StyleDokumentation/GLOBAL_STYLES.md`](src/Dokumentationen/StyleDokumentation/GLOBAL_STYLES.md)

---

## 🎨 Design System

### Farbpalette:
- **Primary**: `#1b3244` (Dunkles Blau)
- **CTA**: `#ef804e` (Orange)
- **Accent**: `#9fce99` (Grün)

### Komponenten-System:
- **24 Angular Komponenten** (10 Shared + 4 UI + 10 Pages)
- **Einheitliche UI-Patterns**
- **Wiederverwendbare SCSS-Mixins**

Vollständige Dokumentation: [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md)

---

## 🛠️ Entwicklungsrichtlinien

### Code-Standards:
- **TypeScript**: Strikte Typisierung
- **Standalone Components**: Moderne Angular-Architektur
- **Reactive Forms**: Für komplexe Formulare
- **SCSS**: Mit Variablen und Mixins

### Ordnerstruktur:
```
src/app/
├── components/
│   ├── shared/          # 10 wiederverwendbare Komponenten
│   └── ui/              # 4 UI-spezifische Komponenten
├── pages/               # 13 Haupt-Seiten
├── services/            # 9 Angular Services
├── directives/          # 5 Custom Direktiven
├── pipes/               # 3 Custom Pipes
├── guards/              # 3 Route Guards
├── interceptors/        # 3 HTTP Interceptors
├── interfaces/          # TypeScript Interfaces
└── models/              # Datenmodelle
```

---

## 📚 Weitere Ressourcen

### Für Anfänger:
- **Komponenten verstehen**: [`COMPONENTS.md`](src/Dokumentationen/COMPONENTS.md) - Sehr ausführlich erklärt
- **SCSS lernen**: [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md) - Mit Beispielen

### Für Fortgeschrittene:
- **Service-Architektur**: [`SERVICES.md`](src/Dokumentationen/SERVICES.md)
- **Advanced Features**: [`DIRECTIVES.md`](src/Dokumentationen/DIRECTIVES.md)

### Für Designer:
- **Design System**: [`StyleDokumentation/STYLES_ALLGEMEIN.md`](src/Dokumentationen/StyleDokumentation/STYLES_ALLGEMEIN.md)
- **Komponenten-Styling**: [`StyleDokumentation/SHARED_COMPONENTS.md`](src/Dokumentationen/StyleDokumentation/SHARED_COMPONENTS.md)

---

## 🚨 Wichtige Hinweise

### Performance:
- Alle Komponenten sind **Standalone Components**
- **Lazy Loading** für große Seiten implementiert
- **OnPush Change Detection** für bessere Performance

### Accessibility:
- **WCAG 2.1** konform
- **Screen Reader** Support
- **Keyboard Navigation**
- **Touch-Targets** min. 44px

### Browser-Support:
- **Modern Browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile Browsers** (iOS Safari, Chrome Mobile)
- **IE11 Support** möglich mit Polyfills

---

## 💡 Tipps für Entwickler

### Debugging:
```typescript
// Lifecycle Hooks zum Debuggen verwenden
ngOnInit(): void {
  console.log('Component initialized', this.inputData);
}
```

### Neue Komponente erstellen:
```bash
ng generate component components/shared/meine-komponente
```

### SCSS-Variablen verwenden:
```scss
@use '../../styles/variables' as vr;
@use '../../styles/mixins' as mi;

.my-component {
  color: vr.$primary-color;
  @include mi.font-size(h2);
}
```

---

## 📞 Support

Bei Fragen zur Dokumentation oder zum Code:

1. **Zuerst**: Relevante `.md` Datei in `src/Dokumentationen/` prüfen
2. **Code-Beispiele**: Sind in allen Dokumentationen enthalten
3. **Best Practices**: Siehe jeweilige Dokumentations-Dateien

---

## 📄 Lizenz

Dieses Projekt ist Eigentum der **Mitra Sanitär GmbH**. Alle Rechte vorbehalten.

---

*📝 Diese README wird regelmäßig aktualisiert. Letztes Update: $(date)*