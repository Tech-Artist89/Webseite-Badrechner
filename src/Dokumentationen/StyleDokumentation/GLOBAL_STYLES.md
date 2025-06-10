# styles.scss - Globale Stylesheet Dokumentation

## Inhaltsverzeichnis

1. [Überblick](#überblick)
2. [Imports und Dependencies](#imports-und-dependencies)
3. [Global Reset](#global-reset)
4. [Body und HTML Styling](#body-und-html-styling)
5. [Utility-Klassen](#utility-klassen)
6. [Bootstrap Overrides](#bootstrap-overrides)
7. [Responsive Design Utilities](#responsive-design-utilities)
8. [Accessibility Features](#accessibility-features)
9. [Spezielle Media Queries](#spezielle-media-queries)
10. [Verwendung und Best Practices](#verwendung-und-best-practices)

---

## Überblick

Die `styles.scss` Datei ist das **Herzstück** des gesamten Styling-Systems. Sie definiert:
- Globale Grundstyles für die gesamte Anwendung
- Bootstrap-Framework Anpassungen
- Responsive Design Utilities
- Accessibility-Features
- Performance-Optimierungen

**Wichtig**: Diese Datei wird automatisch in alle Komponenten geladen und beeinflusst das Aussehen der gesamten Website.

---

## Imports und Dependencies

```scss
@use 'app/styles/variables' as vr;
@use 'app/styles/mixins' as mi;
@use 'app/styles/animations' as an;
@use 'app/styles/components' as co;
@use 'bootstrap/scss/bootstrap';
```

### Was passiert hier?
- **Variables (vr)**: Lädt Farben, Schriftgrößen, Breakpoints
- **Mixins (mi)**: Lädt wiederverwendbare CSS-Funktionen
- **Animations (an)**: Lädt Animationsdefinitionen
- **Components (co)**: Lädt komponentenspezifische Styles
- **Bootstrap**: Lädt das Bootstrap CSS-Framework

### Reihenfolge ist wichtig!
Die Imports müssen in dieser Reihenfolge erfolgen, damit Bootstrap die Custom-Variablen verwenden kann.

---

## Global Reset

```scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Was macht das?
- **margin: 0; padding: 0;**: Entfernt alle Standard-Abstände von Browsern
- **box-sizing: border-box;**: Macht Größenberechnungen vorhersagbarer

### Warum ist das wichtig?
Verschiedene Browser haben unterschiedliche Standard-Styles. Der Reset sorgt für ein einheitliches Aussehen auf allen Browsern.

---

## Body und HTML Styling

### HTML Element
```scss
html {
  scroll-behavior: smooth;
  
  @include mi.media-down(sm) {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
}
```

**Erklärt**:
- `scroll-behavior: smooth`: Sanftes Scrollen bei Anker-Links
- `text-size-adjust`: Verhindert automatische Textvergrößerung auf Mobilgeräten

### Body Element
```scss
body {
  font-family: vr.$font-family-base;
  background-color: vr.$primary-color;
  color: vr.$text-light;
  overflow-x: hidden;
  line-height: vr.$line-height-base;
  @include mi.font-size(body);
  
  // Verbesserungen für Textdarstellung
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

**Erklärt**:
- `font-family`: Verwendet die in Variables definierte Schriftart
- `background-color`: Dunkler Hintergrund für die gesamte Site
- `overflow-x: hidden`: Verhindert horizontales Scrollen
- Font-Smoothing: Macht Text auf verschiedenen Bildschirmen schärfer

---

## Utility-Klassen

### Farb-Utilities
```scss
.text-primary { color: vr.$primary-color !important; }
.text-cta { color: vr.$cta-color !important; }
.text-accent { color: vr.$accent-color !important; }
```

**Verwendung**:
```html
<p class="text-cta">Dieser Text ist orange</p>
<p class="text-accent">Dieser Text ist grün</p>
```

### Responsive Text-Utilities
```scss
.text-responsive {
  @include mi.font-size(body);
}

.text-responsive-small {
  @include mi.font-size(small);
}
```

**Was macht das?**
Diese Klassen passen die Schriftgröße automatisch an die Bildschirmgröße an.

### Bild-Utilities
```scss
img {
  max-width: 100%;
  height: auto;
}

.img-responsive {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

**Erklärt**:
- Alle Bilder sind standardmäßig responsive
- `.img-responsive`: Macht Bilder vollbreite und behält Proportionen bei

---

## Bootstrap Overrides

### Button-Verbesserungen
```scss
.btn {
  @include mi.media-down(lg) {
    min-height: 44px;
    min-width: 44px;
  }
  
  @include mi.media-down(sm) {
    padding: 10px 16px;
    border-radius: 8px;
  }
}
```

**Warum diese Änderungen?**
- **44px Mindestgröße**: Apple's Richtlinie für Touch-Targets
- **Angepasste Größen**: Bessere Bedienbarkeit auf Touchscreens

### Form-Controls
```scss
.form-control,
.form-select {
  @include mi.media-down(sm) {
    font-size: 16px;  // Verhindert Zoom auf iOS
    padding: 12px 16px;
  }
}
```

**iOS-Zoom Problem**: iOS zoomt automatisch, wenn Inputs kleiner als 16px sind. Diese Regel verhindert das.

### Modal-Anpassungen
```scss
.modal {
  @include mi.media-down(sm) {
    padding: 0 !important;
    
    .modal-dialog {
      margin: 0;
      min-height: 100vh;
      max-width: 100%;
    }
  }
}
```

**Mobile-First**: Auf kleinen Bildschirmen werden Modals vollbildschirm angezeigt.

---

## Responsive Design Utilities

### Spacing-Utilities
```scss
.mb-responsive-sm {
  margin-bottom: 0.5rem;
  
  @include mi.media-up(sm) {
    margin-bottom: 1rem;
  }
  
  @include mi.media-up(md) {
    margin-bottom: 1.5rem;
  }
}
```

**Wie es funktioniert**:
- **Mobil**: 0.5rem Abstand
- **Tablet**: 1rem Abstand  
- **Desktop**: 1.5rem Abstand

### Display Utilities
```scss
.d-mobile-none {
  @include mi.media-down(sm) {
    display: none !important;
  }
}

.d-mobile-block {
  @include mi.media-up(sm) {
    display: none !important;
  }
}
```

**Verwendung**:
```html
<div class="d-mobile-none">Nur auf Desktop sichtbar</div>
<div class="d-mobile-block">Nur auf Mobil sichtbar</div>
```

### Text-Alignment
```scss
.text-center-mobile {
  @include mi.media-down(md) {
    text-align: center !important;
  }
}

.text-left-desktop {
  @include mi.media-up(md) {
    text-align: left !important;
  }
}
```

**Praktisch für**: Navigation, Buttons, Überschriften die auf Mobil zentriert, auf Desktop links ausgerichtet sein sollen.

---

## Accessibility Features

### Screen Reader Support
```scss
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

**Verwendung**:
```html
<button>
  <i class="fas fa-search"></i>
  <span class="sr-only">Suchen</span>
</button>
```

**Was passiert**: Der Text ist für Screenreader verfügbar, aber visuell unsichtbar.

### Focus Styles
```scss
*:focus {
  outline: 2px solid vr.$cta-color;
  outline-offset: 2px;
}
```

**Warum wichtig**: Nutzer, die mit der Tastatur navigieren, sehen wo der Fokus ist.

### Skip Links
```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: vr.$cta-color;
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 10000;
  
  &:focus {
    top: 6px;
  }
}
```

**Verwendung**:
```html
<a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
```

**Funktion**: Ermöglicht Tastatur-Nutzern, direkt zum Hauptinhalt zu springen.

---

## Spezielle Media Queries

### Print Styles
```scss
@media print {
  * {
    background: white !important;
    color: black !important;
  }
  
  .no-print {
    display: none !important;
  }
}
```

**Was passiert beim Drucken**:
- Alles wird schwarz auf weiß
- Elemente mit `.no-print` werden ausgeblendet

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Accessibility**: Nutzer mit Bewegungsempfindlichkeit können Animationen in ihren Browser-Einstellungen deaktivieren.

### High Contrast Mode
```scss
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .card,
  .modal-content {
    border: 2px solid currentColor;
  }
}
```

**Zweck**: Bessere Sichtbarkeit für Nutzer mit Sehbehinderungen.

### Landscape Mobile
```scss
@media screen and (max-height: 600px) and (orientation: landscape) {
  .modal-dialog {
    margin: 0.5rem auto;
    max-height: 90vh;
  }
  
  .page-header {
    padding-top: 80px;
    padding-bottom: 40px;
  }
}
```

**Problem**: Auf Handys im Querformat ist wenig Höhe verfügbar.
**Lösung**: Reduzierte Abstände und kleinere Modals.

---

## Verwendung und Best Practices

### Klassen-Kombinationen
```html
<!-- Responsive Spacing -->
<div class="mb-responsive-md p-responsive">
  Inhalt mit responsiven Abständen
</div>

<!-- Mobile-spezifische Anzeige -->
<nav class="d-mobile-none">Desktop Navigation</nav>
<nav class="d-mobile-block">Mobile Navigation</nav>

<!-- Responsive Text -->
<h2 class="text-responsive-large text-center-mobile">
  Große Überschrift, auf Mobil zentriert
</h2>
```

### Do's and Don'ts

**✅ Do's:**
- Verwende die vordefinierten Utility-Klassen
- Teste auf verschiedenen Bildschirmgrößen
- Nutze die Accessibility-Features
- Verwende responsive Spacing-Klassen

**❌ Don'ts:**
- Überschreibe globale Styles nicht direkt
- Verwende keine festen Pixel-Werte für Spacing
- Vergesse nicht die Touch-Target-Größen
- Ignoriere nicht die Accessibility-Richtlinien

### Performance-Tipps

1. **CSS-Variablen nutzen**: Statt Farben zu wiederholen
2. **Responsive Bilder**: Immer `img-responsive` verwenden
3. **Reduced Motion**: Animationen können deaktiviert werden
4. **Print-freundlich**: Wichtige Inhalte sollten druckbar sein

### Debugging-Hilfen

```scss
// Temporär für Debugging hinzufügen:
* {
  outline: 1px solid red;
}

// Oder für Grid-Debugging:
.container, .row, [class*="col-"] {
  border: 1px solid rgba(255, 0, 0, 0.3);
}
```

### Wartung und Updates

**Beim Hinzufügen neuer Utility-Klassen:**
1. Prüfe, ob eine ähnliche Klasse bereits existiert
2. Folge der Naming Convention
3. Füge responsive Varianten hinzu
4. Teste auf allen Breakpoints
5. Dokumentiere die neue Klasse

**Beim Bootstrap-Update:**
1. Prüfe alle Overrides auf Kompatibilität
2. Teste besonders Form-Controls und Buttons
3. Überprüfe die Modal-Funktionalität

---

## Fazit

Die `styles.scss` Datei ist die Basis für ein konsistentes, zugängliches und responsive Design-System. Sie:

- Sorgt für Browser-Konsistenz
- Implementiert responsive Design-Prinzipien
- Bietet Accessibility-Features
- Überschreibt Bootstrap sinnvoll
- Stellt Utility-Klassen für häufige Anwendungsfälle bereit

**Wichtiger Hinweis**: Änderungen an dieser Datei betreffen die gesamte Anwendung. Teste immer alle Seiten nach Modifikationen!