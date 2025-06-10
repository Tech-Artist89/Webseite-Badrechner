# SCSS Dateien Dokumentation

## Inhaltsverzeichnis

1. [Shared Components](#shared-components)
2. [UI Components](#ui-components)
3. [Pages](#pages)

---

## Shared Components

### 1. bathroom-configurator.component.scss

**Zweck**: Styles für den Badkonfigurator - das Hauptelement der Anwendung für die Badplanung.

**Hauptklassen**:
- `.configurator-container`: Vollbild-Container mit Overflow-Hidden
- `.hero-section`: Gradient-Header mit primären Farben
- `.hero-title`: Responsive Titel mit Icon-Integration
- `.feature-item`: Glasmorphismus-Karten mit Hover-Effekten
- `.floating-elements`: Animierte Hintergrund-Elemente

**Responsive Features**:
- Mobile-first Design mit Media-Queries
- Adaptive Padding und Schriftgrößen
- Touch-optimierte Buttons (min. 44px)
- Grid-Layout Anpassungen für verschiedene Bildschirmgrößen

**Besonderheiten**:
- Backdrop-filter für Glaseffekte
- CSS-Animationen für schwebende Elemente
- Gradient-Hintergründe mit CSS-Variablen

---

### 2. footer.component.scss

**Zweck**: Footer-Styling mit Kontaktinformationen und Social Media Links.

**Hauptklassen**:
- `.footer`: Dunkler Gradient-Hintergrund
- `.footer-section`: Flexible Content-Bereiche
- `.contact-item`: Icon-Text Kombinationen
- `.social-links`: Social Media Button-Grid
- `.social-link`: Runde Hover-Buttons

**Responsive Features**:
- Mobile-zentrierte Layouts
- Anpassbare Icon-Größen
- Flexible Grid-Systeme

**Besonderheiten**:
- Icon-Integration mit Font Awesome
- Hover-Transformationen
- Border-Effekte mit Transparenz

---

### 3. header.component.scss

**Zweck**: Fixierter Header mit scrollabhängigen Änderungen.

**Hauptklassen**:
- `.header`: Fixed-positioned mit Backdrop-Filter
- `.header-content`: Flex-Layout für Logo und Navigation
- `.logo-link`: Responsive Logo mit Icon
- `.scrolled`: Zustandsklasse für gescrollte Position

**Responsive Features**:
- Anpassbare Header-Höhen
- Mobile-optimierte Logo-Größen
- Touch-Target Optimierung

**Besonderheiten**:
- Backdrop-filter für Glaseffekt
- Scroll-basierte Stiländerungen
- Smooth Transitions

---

### 4. image-checkbox.component.scss

**Zweck**: Benutzerdefinierte Checkbox-Komponente mit Bildern.

**Hauptklassen**:
- `.image-checkbox-container`: Card-Layout mit Hover-Effekten
- `.checkbox-image`: Responsive Bild-Container
- `.checkbox-overlay`: Floating Selection-Indicator
- `.popup-btn`: Info-Button mit Gradient

**Responsive Features**:
- Skalierbare Bild-Höhen
- Adaptive Button-Größen
- Mobile-optimierte Touch-Targets

**Besonderheiten**:
- Custom Selection-States
- Box-Shadow Effekte
- Transform-Animationen

---

### 5. loading.component.scss

**Zweck**: Loading-Overlay mit verschiedenen Spinner-Varianten.

**Hauptklassen**:
- `.loading-overlay`: Fullscreen-Overlay mit Blur
- `.spinner`: Rotierende CSS-Animation
- `.loading-dots`: Alternative Dot-Animation
- `.pulse-spinner`: Pulsierender Effekt

**Responsive Features**:
- Skalierbare Spinner-Größen
- Adaptive Spacing
- Reduced-Motion Support

**Besonderheiten**:
- CSS-only Animationen
- Multiple Spinner-Varianten
- Accessibility-Features

---

### 6. navigation-buttons.component.scss

**Zweck**: Navigation-Buttons für mehrstufige Formulare.

**Hauptklassen**:
- `.navigation-buttons`: Flex-Layout Container
- `.btn-outline-light`: Transparente Outline-Buttons
- `.btn-cta`: Primary Action Button
- `.btn-accent`: Secondary Action Button

**Responsive Features**:
- Mobile-Stack Layout
- Adaptive Button-Größen
- Touch-optimierte Targets

**Besonderheiten**:
- Gradient-Buttons
- Hover-Transformationen
- Disabled-States

---

### 7. navigation.component.scss

**Zweck**: Hauptnavigation mit Mobile-Menü und Dropdown-Funktionalität.

**Hauptklassen**:
- `.navigation`: Main Navigation Container
- `.menu-toggle`: Mobile Hamburger Menu
- `.nav-list`: Flexible Navigation Liste
- `.dropdown-menu`: Versteckte Dropdown-Menüs
- `.special-nav`: Hervorgehobene Navigation (Badrechner)

**Responsive Features**:
- Mobile-first Hamburger-Menü
- Responsive Dropdown-Positionen
- Touch-optimierte Navigation
- Fullscreen Mobile-Overlay

**Besonderheiten**:
- Complex Mobile-Menu System
- Animated Hamburger-Icon
- Special Highlighting für Badrechner
- CSS-only Dropdown-Funktionalität
- Badge-Animationen

---

### 8. popup-modal.component.scss

**Zweck**: Modal-Dialog für zusätzliche Informationen und Auswahloptionen.

**Hauptklassen**:
- `.modal`: Bootstrap-Modal Override
- `.modal-backdrop`: Custom Backdrop mit Blur
- `.option-card`: Selectable Cards im Modal
- `.selection-indicator`: Visual Selection Feedback

**Responsive Features**:
- Mobile-fullscreen für kleine Bildschirme
- Adaptive Modal-Größen
- Touch-optimierte Buttons

**Besonderheiten**:
- Backdrop-Filter Effects
- Custom Selection States
- Smooth Transitions
- Card-based Layouts

---

### 9. progress-indicator.component.scss

**Zweck**: Fortschrittsanzeige für mehrstufige Prozesse.

**Hauptklassen**:
- `.progress-container`: Card-Layout für Progress
- `.progress-bar`: Animierte Fortschrittsleiste
- `.step-indicators`: Schritt-für-Schritt Anzeige
- `.step-circle`: Individuelle Schritt-Marker

**Responsive Features**:
- Flexible Step-Layouts
- Skalierbare Circle-Größen
- Mobile-optimierte Spacing

**Besonderheiten**:
- Animated Progress Transitions
- Color-coded Step States
- Custom Step Styling

---

### 10. range-slider.component.scss

**Zweck**: Custom Range-Slider mit Labels und Wert-Anzeige.

**Hauptklassen**:
- `.custom-range`: Styled Range Input
- `.slider-labels`: Min/Max Labels
- `.value-display`: Current Value Card
- `.current-value`: Highlighted Current Value

**Responsive Features**:
- Touch-optimierte Slider-Handles
- Adaptive Label-Größen
- Mobile-friendly Spacing

**Besonderheiten**:
- Cross-browser Slider Styling
- Custom Thumb Design
- Value Display Integration

---

