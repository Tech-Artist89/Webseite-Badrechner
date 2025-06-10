# Angular Styles Ordner - SCSS/Sass Dokumentation

## 📋 Übersicht

Der `/styles` Ordner enthält die SCSS-Dateien (Sass) für das gesamte Styling Ihres Angular-Projekts. Diese Dateien implementieren ein modernes, responsives Design-System für die Mitra Sanitär GmbH Website.

## 🎨 Was ist SCSS/Sass?

**SCSS (Sassy CSS)** ist eine erweiterte Version von CSS mit zusätzlichen Features wie:
- **Variablen** (`$primary-color: #1b3244`)
- **Mixins** (wiederverwendbare Code-Blöcke)
- **Verschachtelung** (CSS-Regeln ineinander)
- **Funktionen** und **Berechnungen**

---

## 📁 Datei-Übersicht

### 🔗 Abhängigkeitsstruktur
```
_variables.scss     ← Grundlage (Farben, Größen, etc.)
       ↓
_mixins.scss        ← Wiederverwendbare Funktionen
       ↓
_animations.scss    ← Animationen (nutzt Mixins & Variablen)
       ↓
_components.scss    ← Fertige UI-Komponenten
```

---

## 1. 📐 `_variables.scss` - Das Fundament

**Zweck**: Definiert alle grundlegenden Design-Werte zentral an einem Ort.

### 🎨 Farbpalette
```scss
// Markenfarben von Mitra Sanitär
$primary-color: #1b3244;   // Dunkles Blau (Hauptfarbe)
$cta-color: #ef804e;       // Orange (Call-to-Action Buttons)
$accent-color: #9fce99;    // Grün (Akzentfarbe)
$text-light: #ffffff;      // Weißer Text
$text-dark: #333333;       // Dunkler Text
```

### 📱 Responsive Breakpoints (Mobile First)
```scss
$xs: 0px;         // Smartphones (Hochformat)
$sm: 576px;       // Smartphones (Querformat)
$md: 768px;       // Tablets
$lg: 992px;       // Desktop
$xl: 1200px;      // Große Desktops
$xxl: 1400px;     // Sehr große Bildschirme
```

### ✏️ Typography System
Das Projekt verwendet ein responsives Typografie-System mit unterschiedlichen Schriftgrößen je Bildschirmgröße:

```scss
$font-sizes: (
  xs: (          // Smartphone
    h1: 1.75rem, // 28px
    h2: 1.5rem,  // 24px
    body: 0.875rem // 14px
  ),
  md: (          // Tablet
    h1: 2.5rem,  // 40px
    h2: 2rem,    // 32px
    body: 1rem   // 16px
  ),
  xl: (          // Desktop
    h1: 3.5rem,  // 56px
    h2: 3rem,    // 48px
    body: 1.125rem // 18px
  )
);
```

### 📏 Spacing System
Konsistente Abstände für alle Bildschirmgrößen:

```scss
$spacing: (
  xs: (
    section: 40px 0,    // Weniger Abstand auf Handy
    container: 1rem,    // 16px Padding
    grid-gap: 1rem      // 16px zwischen Grid-Items
  ),
  lg: (
    section: 100px 0,   // Mehr Abstand auf Desktop
    container: 2rem,    // 32px Padding
    grid-gap: 2.5rem    // 40px zwischen Grid-Items
  )
);
```

#### 🎯 **Anfänger-Tipp**: 
Wenn Sie eine Farbe ändern möchten, tun Sie das nur in `_variables.scss`. Die Änderung wird automatisch auf der ganzen Website übernommen!

---

## 2. 🧩 `_mixins.scss` - Wiederverwendbare Funktionen

**Zweck**: Sammelt häufig verwendete CSS-Patterns in wiederverwendbare Funktionen (Mixins).

### 📱 Media Query Mixins
Vereinfachen responsive Design:

```scss
// Statt diesem komplizierten Code:
@media (min-width: 768px) {
  .my-class { font-size: 2rem; }
}

// Schreiben Sie einfach:
@include media-up(md) {
  .my-class { font-size: 2rem; }
}
```

**Verfügbare Mixins:**
- `@include media-up(md)` - Ab Tablet aufwärts
- `@include media-down(sm)` - Nur Smartphones
- `@include media-between(sm, lg)` - Nur Tablets

### 📝 Font-Size Mixin
Automatisch responsive Schriftgrößen:

```scss
.my-title {
  @include font-size(h1);
  // Wird automatisch zu:
  // Smartphone: 1.75rem
  // Tablet: 2.5rem  
  // Desktop: 3.5rem
}
```

### 🏗️ Layout Mixins

**Grid Responsive:**
```scss
.service-grid {
  @include grid-responsive(1, 2, 3, 4);
  // 1 Spalte auf Handy
  // 2 Spalten auf Tablet
  // 3 Spalten auf Desktop
  // 4 Spalten auf großen Bildschirmen
}
```

**Flexbox Center:**
```scss
.center-content {
  @include flex-center;
  // Automatisch zentriert (horizontal + vertikal)
}
```

### 🎯 Button Styles

**CTA Button (Call-to-Action):**
```scss
.my-button {
  @include btn-cta;
  // Erstellt automatisch:
  // - Orange Gradient
  // - Hover-Effekte
  // - Responsive Padding
  // - Smooth Animationen
}
```

### 🔮 Glass Effect
Moderner Glasmorphismus-Effekt:

```scss
.glass-card {
  @include glass-effect(0.1);
  // Erstellt durchscheinenden Hintergrund
  // mit Blur-Effekt
}
```

#### 🎯 **Anfänger-Tipp**: 
Mixins sind wie Funktionen in der Programmierung. Einmal definiert, können Sie sie überall verwenden!

---

## 3. 🎬 `_animations.scss` - Bewegung und Leben

**Zweck**: Definiert alle Animationen und Bewegungseffekte der Website.

### 🌊 Keyframe Animationen

**Fade In (Einblenden):**
```scss
@keyframes fadeIn {
  from {
    opacity: 0;           // Unsichtbar
    transform: translateY(20px); // 20px nach unten
  }
  to {
    opacity: 1;           // Vollständig sichtbar
    transform: translateY(0); // An ursprünglicher Position
  }
}
```

**Float (Schweben):**
```scss
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }  // Hebt sich 10px
}
```

### 🎭 Animation Classes

Diese CSS-Klassen können Sie direkt in HTML verwenden:

```html
<!-- Element wird beim Scrollen eingeblendet -->
<div class="fade-in">Ihr Inhalt</div>

<!-- Element schwebt sanft auf und ab -->
<div class="float">🏠</div>

<!-- Element hebt sich beim Hover -->
<div class="hover-lift">Hover mich!</div>

<!-- Element pulsiert -->
<div class="pulse">💡</div>

<!-- Element springt rein -->
<div class="bounce-in">🎉</div>
```

### 📱 Responsive Animationen
Animationen passen sich der Bildschirmgröße an:

```scss
.fade-in {
  // Smartphone: translateY(20px)
  transform: translateY(20px);
  
  @include media-up(md) {
    // Tablet/Desktop: translateY(30px) - mehr Bewegung
    transform: translateY(30px);
  }
}
```

### ⚡ Performance-Optimierung

**Staggered Animations (Verzögerte Animationen):**
```scss
.fade-in:nth-child(1) { transition-delay: 0.1s; }
.fade-in:nth-child(2) { transition-delay: 0.2s; }
.fade-in:nth-child(3) { transition-delay: 0.3s; }
// Elemente erscheinen nacheinander
```

**Mobile Optimierung:**
```scss
@media (prefers-reduced-motion: reduce) {
  .fade-in, .float, .pulse {
    animation: none; // Keine Animationen für Nutzer mit Bewegungsempfindlichkeit
  }
}
```

#### 🎯 **Anfänger-Beispiel**:
```html
<div class="service-card fade-in hover-lift">
  <h3>Heizungsbau</h3>
  <p>Moderne Heizungsanlagen...</p>
</div>
```

---

## 4. 🏗️ `_components.scss` - UI-Komponenten

**Zweck**: Definiert fertige UI-Komponenten, die auf der ganzen Website verwendet werden.

### 📄 Page Components

**Page Header:**
```scss
.page-header {
  @include section-padding();  // Responsive Padding
  background: linear-gradient(135deg, $primary-color 0%, darker-blue 100%);
  text-align: center;
  
  // Responsive Höhe:
  padding-top: 100px;  // Smartphone
  
  @include media-up(md) {
    padding-top: 120px; // Tablet
  }
  
  @include media-up(lg) {
    padding-top: 140px; // Desktop
  }
}
```

**Section Title mit Unterstrich:**
```scss
.section-title {
  @include font-size(h2);      // Responsive Schr