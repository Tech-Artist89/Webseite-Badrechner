# Angular Pages Dokumentation - Mitra Sanitär 
## Vollständiger Leitfaden für Anfänger

> Diese Dokumentation erklärt alle Seiten (Pages) der Mitra Sanitär Webanwendung auf eine Weise, die auch Anfänger verstehen können.

## 📋 Inhaltsverzeichnis

1. [Was sind Pages?](#was-sind-pages)
2. [Projektstruktur](#projektstruktur)
3. [Routing-System](#routing-system)
4. [Alle Pages im Detail](#alle-pages-im-detail)
5. [Gemeinsame Patterns](#gemeinsame-patterns)
6. [Responsive Design](#responsive-design)
7. [Services Integration](#services-integration)
8. [Anfänger-Tipps](#anfänger-tipps)

---

## Was sind Pages?

**Pages** (Seiten) sind die Hauptbereiche einer Website, die Benutzer besuchen können. Jede Page ist eine Angular-Komponente, die:

- **Eine URL hat** (z.B. `/about`, `/contact`)
- **Eigenen Inhalt zeigt** (HTML-Template)
- **Eigenes Styling hat** (SCSS-Datei)
- **Logik enthält** (TypeScript-Datei)

### Beispiel einer einfachen Page:
```typescript
// Eine Page ist eine normale Angular-Komponente
@Component({
  selector: 'app-home',        // Wie die Komponente heißt
  templateUrl: './home.html',  // HTML-Datei
  styleUrls: ['./home.scss']   // CSS-Datei
})
export class HomeComponent {
  title = "Willkommen!";       // Daten für die Seite
}
```

---

## Projektstruktur

```
src/app/pages/
├── about/                    # Über uns Bereich
│   ├── about.component.*     # Haupt-Über-uns Seite
│   ├── company/              # Unterseite: Firma
│   └── team/                 # Unterseite: Team
├── badrechner/               # Badezimmer-Konfigurator
│   ├── badrechner.component.*
│   ├── page-one/             # Schritt 1: Ausstattung
│   ├── page-two/             # Schritt 2: Qualität
│   ├── page-three/           # Schritt 3: Fliesen
│   ├── page-four/            # Schritt 4: Heizung
│   └── page-five/            # Schritt 5: Kontakt
├── contact/                  # Kontakt Bereich
│   ├── contact.component.*   # Haupt-Kontakt Seite
│   └── career/               # Unterseite: Karriere
├── home/                     # Startseite
├── legal/                    # Impressum
└── services/                 # Dienstleistungen
    ├── services.component.*  # Haupt-Services Seite
    ├── bathroom/             # Unterseite: Bäderbau
    ├── heating/              # Unterseite: Heizungsbau
    └── installation/         # Unterseite: Installation
```

### Was bedeuten die Dateiendungen?

- **`.component.ts`** = Die Logik der Seite (TypeScript)
- **`.component.html`** = Das Layout der Seite (HTML)
- **`.component.scss`** = Das Styling der Seite (CSS)
- **`.component.spec.ts`** = Tests für die Seite

---

## Routing-System

Das **Routing** bestimmt, welche Page bei welcher URL angezeigt wird:

```typescript
// Beispiel Routing-Tabelle
const routes = [
  { path: '', component: HomeComponent },                    // Startseite
  { path: 'about', component: AboutComponent },              // /about
  { path: 'about/company', component: CompanyComponent },    // /about/company
  { path: 'contact', component: ContactComponent },          // /contact
  { path: 'services', component: ServicesComponent },       // /services
  // ... weitere Routes
];
```

### Wie funktioniert Routing?

1. **Benutzer klickt Link** oder gibt URL ein
2. **Angular Router** schaut in der Routing-Tabelle nach
3. **Passende Komponente wird geladen** und angezeigt
4. **URL in Browser ändert sich**

---

## Alle Pages im Detail

### 🏠 1. HomeComponent (Startseite)

**URL**: `/` (Hauptseite)
**Zweck**: Erste Seite, die Besucher sehen

**Aufbau**:
```html
<div class="home-page">
  <app-hero-section></app-hero-section>           <!-- Großer Header-Bereich -->
  <section class="badrechner-highlight">          <!-- Badrechner bewirben -->
  <section class="services-preview">              <!-- Services anzeigen -->
  <section class="badrechner-teaser">             <!-- Nochmal Badrechner -->
  <section class="why-choose-us">                 <!-- Warum uns wählen -->
</div>
```

**Besonderheiten**:
- **Hero-Section**: Großer, eindrucksvoller Bereich oben
- **Service-Cards**: Zeigt Services von DataService
- **Badrechner-Werbung**: Bewirbt den Badrechner (wichtigste Funktion)
- **Animationen**: Fade-In-Effekte beim Scrollen

**Warum wichtig?**: Erste Eindruck entscheidet über Benutzer-Verhalten

---

### 👥 2. About-Bereich

#### 2.1 AboutComponent (Übersicht)
**URL**: `/about`
**Zweck**: Navigation zu Unterseiten

```html
<!-- Einfache Navigation mit großen Karten -->
<div class="about-nav-card" routerLink="/about/company">
  <i class="fas fa-building"></i>
  <h3>Unser Unternehmen</h3>
  <p>Geschichte, Vision und Werte</p>
</div>
```

#### 2.2 CompanyComponent (Firma)
**URL**: `/about/company`
**Zweck**: Firmengeschichte und Werte

**Inhalte**:
- **Firmengeschichte**: Wie alles begann
- **Meilensteine**: Timeline mit wichtigen Ereignissen
- **Firmenwerte**: Was dem Unternehmen wichtig ist
- **Statistiken**: Zahlen zur Firma

**Timeline-Beispiel**:
```html
<div class="timeline-item">
  <div class="timeline-year">2024</div>
  <h4>Firmengründung</h4>
  <p>Patrick van Dahlen gründet das Unternehmen</p>
</div>
```

#### 2.3 TeamComponent (Team)
**URL**: `/about/team`
**Zweck**: Teammitglieder vorstellen

**Funktionen**:
- **Team-Cards**: Zeigt jeden Mitarbeiter
- **Abteilungen**: Gruppiert nach Management, Planung, Technik
- **Karriere-Link**: Verbindung zu Stellenausschreibungen

---

### 🛁 3. Badrechner-Bereich (5-Schritt-Konfigurator)

**Besonderheit**: Mehrstufiger Assistent für Badezimmer-Planung

#### 3.1 BathroomConfiguratorComponent (Hauptkomponente)
**URL**: `/badrechner`
**Zweck**: Container für alle 5 Schritte

```html
<div class="configurator-container">
  <div class="hero-section"><!-- Hero-Bereich --></div>
  <router-outlet></router-outlet>  <!-- Hier werden die Schritte geladen -->
</div>
```

#### 3.2 PageOneComponent (Schritt 1: Ausstattung)
**URL**: `/badrechner/1`
**Zweck**: Badezimmer-Ausstattung auswählen

**Funktionen**:
- **Equipment-Grid**: Auswahl von WC, Dusche, Badewanne, etc.
- **Popup-Details**: Zusätzliche Optionen pro Ausstattung
- **Größen-Slider**: Badezimmer-Größe in m² einstellen

**Code-Beispiel**:
```typescript
onEquipmentSelectionChange(equipmentId: string, selected: boolean): void {
  // Speichert Auswahl im Service
  this.bathroomDataService.updateEquipmentSelection(equipmentId, selected);
}
```

#### 3.3 PageTwoComponent (Schritt 2: Qualität)
**URL**: `/badrechner/2`
**Zweck**: Qualitätsstufe wählen

**Optionen**:
- **Standard**: Grundausstattung
- **Komfort**: Bessere Materialien
- **Premium**: Luxus-Ausstattung

#### 3.4 PageThreeComponent (Schritt 3: Fliesen)
**URL**: `/badrechner/3`
**Zweck**: Boden- und Wandfliesen auswählen

**Bereiche**:
- **Bodenfliesen**: Normal, Groß, Mosaik
- **Wandfliesen**: Normal, Groß, Mosaik
- **Info-Bereich**: Erklärungen zu Fliesentypen

#### 3.5 PageFourComponent (Schritt 4: Heizung)
**URL**: `/badrechner/4`
**Zweck**: Heizungsoptionen wählen

**Optionen**:
- **Heizkörper**: Klassische Lösung
- **Fußbodenheizung**: Komfortable Wärme
- **Kombination**: Beides möglich

#### 3.6 PageFiveComponent (Schritt 5: Kontakt)
**URL**: `/badrechner/5`
**Zweck**: Kontaktdaten und Anfrage senden

**Funktionen**:
- **Zusätzliche Infos**: Checkboxen für weitere Informationen
- **Kommentare**: Freies Textfeld für Wünsche
- **Kontaktformular**: Persönliche Daten
- **E-Mail-Versand**: Sendet Konfiguration per E-Mail

---

### 📞 4. Contact-Bereich

#### 4.1 ContactComponent (Hauptkontakt)
**URL**: `/contact`
**Zweck**: Hauptkontaktseite

**Bereiche**:
- **Notdienst-Banner**: Auffälliger 24/7-Hinweis
- **Kontaktformular**: Allgemeines Kontaktformular
- **Kontaktinfos**: Adresse, Telefon, E-Mail, Öffnungszeiten
- **Karte**: Google Maps Integration

**Notdienst-Beispiel**:
```html
<div class="emergency-banner">
  <h3>24/7 Notdienst</h3>
  <a href="tel:+491234567890" class="btn-emergency">
    Jetzt anrufen: 030 76008921
  </a>
</div>
```

#### 4.2 CareerComponent (Karriere)
**URL**: `/contact/career`
**Zweck**: Stellenausschreibungen und Bewerbungsinfos

**Inhalte**:
- **Job-Offers**: Aktuelle Stellenausschreibungen
- **Benefits**: Warum bei Mitra Sanitär arbeiten
- **Bewerbungsprozess**: Schritte der Bewerbung

---

### ⚖️ 5. LegalComponent (Impressum)

**URL**: `/legal`
**Zweck**: Rechtliche Informationen

**Pflichtangaben**:
- Firmeninformationen
- Kontaktdaten
- Registereintrag
- Umsatzsteuer-ID
- Datenschutz-Hinweise
- Haftungsausschluss

---

### 🔧 6. Services-Bereich

#### 6.1 ServicesComponent (Übersicht)
**URL**: `/services`
**Zweck**: Alle Dienstleistungen anzeigen

**Aufbau**:
- **Service-Cards**: Von DataService geladen
- **Warum-wir-Sektion**: Vorteile des Unternehmens

#### 6.2 BathroomComponent (Bäderbau)
**URL**: `/services/bathroom`
**Zweck**: Detailinfo zu Bäderbau

**Inhalte**:
- **Hero-Bereich**: Einführung in Bäderbau
- **Service-Liste**: Spezifische Bad-Services
- **Prozess-Timeline**: Wie ein Bad entsteht

#### 6.3 HeatingComponent (Heizungsbau)
**URL**: `/services/heating`
**Zweck**: Detailinfo zu Heizungsbau

**Heizungstypen**:
- **Wärmepumpen**: Umweltfreundlich
- **Gasheizungen**: Bewährt
- **Fußbodenheizung**: Komfortabel

#### 6.4 InstallationComponent (Installation)
**URL**: `/services/installation`
**Zweck**: Installation und Service-Infos

**Besonderheiten**:
- **Notdienst-Sektion**: Erste Hilfe bei Wasserschäden
- **Service-Karten**: Verschiedene Services
- **Wartungsverträge**: Langfristige Betreuung

---

## Gemeinsame Patterns

### 📱 1. Responsive Page-Header

**Jede Page hat einen einheitlichen Header**:

```html
<section class="page-header">
  <div class="container">
    <h1 class="page-title">Seitentitel</h1>
    <p class="page-subtitle">Untertitel</p>
  </div>
</section>
```

**CSS-Pattern**:
```scss
.page-header {
  @include mi.section-padding();
  padding-top: 100px;  // Platz für fixed Header
  background: linear-gradient(135deg, $primary-color 0%, darken($primary-color, 15%) 100%);
}
```

### 🎨 2. Section-Struktur

**Jeder Inhaltsbereich folgt diesem Muster**:

```html
<section class="section-name section">
  <div class="container">
    <h2 class="section-title">Titel</h2>
    <div class="row g-4">
      <!-- Inhalt in Bootstrap Grid -->
    </div>
  </div>
</section>
```

### 🃏 3. Card-Komponenten

**Einheitliche Karten für verschiedene Inhalte**:

```scss
.card-name {
  @include mi.card-responsive();  // Responsive Karten-Styling
  
  &:hover {
    transform: translateY(-5px);   // Hover-Effekt
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
}
```

### 🔗 4. Navigation-Pattern

**Konsistente Navigation zwischen Seiten**:

```html
<a routerLink="/ziel-seite" class="btn btn-cta">
  Text <i class="fas fa-arrow-right"></i>
</a>
```

---

## Responsive Design

### 📏 Breakpoints (Bildschirmgrößen)

```scss
$sm: 576px;   // Kleine Handys
$md: 768px;   // Tablets
$lg: 992px;   // Laptops
$xl: 1200px;  // Desktop
```

### 📱 Mobile-First Ansatz

**Alle Pages sind Mobile-First designed**:

```scss
// 1. Zuerst Mobile Styles
.element {
  font-size: 1rem;
  padding: 1rem;
}

// 2. Dann größere Bildschirme
@include mi.media-up(md) {
  .element {
    font-size: 1.2rem;
    padding: 2rem;
  }
}
```

### 🔧 Responsive Utilities

**Häufig verwendete Mixins**:

```scss
// Responsive Grid
@include mi.grid-responsive(1, 2, 2, 3, 4, 4);
// Mobile: 1 Spalte, Tablet: 2, Desktop: 3-4

// Responsive Container
@include mi.container-responsive();

// Responsive Schrift
@include mi.font-size(h1);  // Passt sich automatisch an
```

---

## Services Integration

### 📊 DataService

**Viele Pages nutzen den DataService für Daten**:

```typescript
export class HomeComponent implements OnInit {
  services: Service[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Lädt Services vom Server/Mock-Daten
    this.dataService.getServices().subscribe(services => {
      this.services = services;
    });
  }
}
```

### 🛁 BathroomDataService

**Speziell für den Badrechner**:

```typescript
// Speichert Benutzerdaten während der 5 Schritte
this.bathroomDataService.updateEquipmentSelection(id, selected);
this.bathroomDataService.updateBathroomSize(size);
this.bathroomDataService.updateQualityLevel(quality);
```

### 🧭 NavigationBadrechnerService

**Steuert Navigation im Badrechner**:

```typescript
// Zum nächsten Schritt
this.NavigationBadrechnerService.navigateToNext();

// Zum vorherigen Schritt
this.NavigationBadrechnerService.navigateToPrevious();

// Zu bestimmtem Schritt
this.NavigationBadrechnerService.navigateToPage(3);
```

---

## Anfänger-Tipps

### 🚀 1. Neue Page erstellen

**Schritt-für-Schritt Anleitung**:

```bash
# 1. Neue Komponente generieren
ng generate component pages/meine-neue-page

# 2. Route hinzufügen (app-routing.module.ts)
{
  path: 'meine-seite',
  component: MeineNeuePageComponent
}

# 3. Navigation hinzufügen
<a routerLink="/meine-seite">Meine Seite</a>
```

### 📝 2. Page-Template Struktur

**Jede neue Page sollte so aufgebaut sein**:

```html
<div class="meine-page">
  <!-- 1. Header -->
  <section class="page-header">
    <div class="container">
      <h1 class="page-title">Seitentitel</h1>
      <p class="page-subtitle">Beschreibung</p>
    </div>
  </section>

  <!-- 2. Hauptinhalt -->
  <section class="haupt-bereich section">
    <div class="container">
      <h2 class="section-title">Bereichstitel</h2>
      <!-- Inhalt hier -->
    </div>
  </section>

  <!-- 3. Weitere Bereiche nach Bedarf -->
</div>
```

### 🎨 3. Styling-Tipps

**Einheitliches Styling verwenden**:

```scss
@use '../../styles/variables' as vr;  // Farben und Variablen
@use '../../styles/mixins' as mi;     // Wiederverwendbare Styles

.meine-page {
  // Basis-Seiten-Styles
  .section {
    @include mi.section-padding();  // Einheitliche Abstände
  }
  
  .section-title {
    @include mi.font-size(h2);      // Responsive Schrift
    color: vr.$text-light;          // Einheitliche Farbe
  }
}
```

### 🔧 4. Häufige Fehler vermeiden

**Do's:**
- ✅ Immer `container` für Inhalte verwenden
- ✅ Responsive Mixins nutzen
- ✅ Einheitliche Klassen-Namen
- ✅ Mobile-First denken

**Don'ts:**
- ❌ Direkte Pixel-Werte in CSS
- ❌ Inline-Styles verwenden
- ❌ Fehlende Container-Wrapper
- ❌ Nicht-responsive Designs

### 📚 5. Debugging-Tipps

**Wenn etwas nicht funktioniert**:

```typescript
// 1. Console-Logs verwenden
ngOnInit(): void {
  console.log('Page wurde geladen');
  
  this.dataService.getServices().subscribe(services => {
    console.log('Services erhalten:', services);
    this.services = services;
  });
}

// 2. Fehlerbehandlung
.subscribe({
  next: (data) => console.log('Erfolg:', data),
  error: (error) => console.error('Fehler:', error)
});
```

### 🎯 6. Performance-Tipps

**Pages schnell laden lassen**:

```typescript
// 1. Lazy Loading für große Pages
const routes: Routes = [
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component')
      .then(c => c.ServicesComponent)
  }
];

// 2. OnPush Change Detection für bessere Performance
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// 3. Subscriptions ordentlich beenden
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

---

## Zusammenfassung

Die Mitra Sanitär Website verwendet ein **modulares Page-System** mit:

### ✨ Hauptmerkmale:
- **13 Haupt-Pages** mit klarer Struktur
- **Responsive Design** für alle Geräte
- **Einheitliche UI-Patterns** für Konsistenz
- **Service-Integration** für dynamische Daten
- **5-Schritt-Badrechner** als Hauptfeature

### 🎯 Zielgruppen:
- **Entwickler**: Klare Struktur und wiederverwendbare Patterns
- **Designer**: Einheitliche Designsprache
- **Content-Manager**: Einfache Inhalts-Pflege
- **Benutzer**: Intuitive Navigation und Bedienung

### 🚀 Nächste Schritte:
1. **Neue Pages** nach den gezeigten Patterns erstellen
2. **Bestehende Pages** erweitern oder anpassen
3. **Tests** für alle Pages schreiben
4. **SEO-Optimierung** für bessere Auffindbarkeit

Diese Dokumentation hilft dabei, das Page-System zu verstehen und erfolgreich zu erweitern! 🎉