# 📚 Komponenten-Dokumentation - Mitra Sanitär Website

## Überblick

Diese Dokumentation erklärt alle Komponenten der Angular-Website für den Sanitärbetrieb Mitra. Jede Komponente wird detailliert beschrieben, damit auch Anfänger verstehen, wozu sie dient.

## Architektur

```
src/app/components/
├── shared/          # Wiederverwendbare Komponenten
│   ├── bathroom-configurator/
│   ├── footer/
│   ├── header/
│   ├── image-checkbox/
│   ├── loading/
│   ├── navigation-buttons/
│   ├── navigation/
│   ├── popup-modal/
│   ├── progress-indicator/
│   └── range-slider/
└── ui/              # UI-spezifische Komponenten
    ├── contact-form/
    ├── hero-section/
    ├── service-card/
    └── team-card/
```

## 🔧 Shared Components (Wiederverwendbare Komponenten)

Diese Komponenten werden an mehreren Stellen der Website verwendet.

### 1. **Header Component** 
📍 `src/app/components/shared/header/`

**Zweck:** Die Kopfzeile der Website, die oben auf jeder Seite angezeigt wird.

**Was macht sie:**
- Zeigt das Logo und den Firmennamen "Mitra Sanitär"
- Enthält die Hauptnavigation
- Bleibt beim Scrollen oben fixiert
- Ändert ihr Aussehen beim Scrollen (wird dunkler)

**Besondere Funktionen:**
- **Responsive Design:** Passt sich automatisch an verschiedene Bildschirmgrößen an
- **Scroll-Effekt:** Wird kompakter und dunkler beim Scrollen
- **Logo mit Icon:** Zeigt ein Werkzeug-Symbol neben dem Firmennamen

**Verwendung:**
```html
<app-header></app-header>
```

**TypeScript Logik:**
```typescript
export class HeaderComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}
```

---

### 2. **Navigation Component**
📍 `src/app/components/shared/navigation/`

**Zweck:** Das Hauptmenü der Website mit allen wichtigen Links.

**Was macht sie:**
- Zeigt alle Hauptmenüpunkte (Startseite, Badrechner, Dienstleistungen, etc.)
- Hat Dropdown-Menüs für Unterkategorien
- Funktioniert auf Desktop und Mobile unterschiedlich
- Hebt den **Badrechner** besonders hervor (mit "NEU"-Badge)

**Mobile Funktionen:**
- **Hamburger-Menü:** Drei Striche, die das Menü öffnen/schließen
- **Vollbild-Menü:** Das Menü nimmt den ganzen Bildschirm ein
- **Touch-optimiert:** Große Buttons für Finger-Bedienung

**Desktop Funktionen:**
- **Hover-Effekte:** Menüpunkte reagieren auf Mausbewegungen
- **Dropdown-Menüs:** Untermenüs öffnen sich beim Drüberfahren

**Besonderheiten:**
```html
<!-- Badrechner wird speziell hervorgehoben -->
<li class="nav-item special-nav">
  <a routerLink="/badrechner" class="nav-link nav-link-special">
    <i class="fas fa-bath"></i>
    Badrechner
    <span class="special-badge">NEU</span>
  </a>
</li>
```

**Funktionen:**
```typescript
export class NavigationComponent {
  isMenuOpen = false;
  activeDropdown: string | null = null;

  toggleMenu(event?: Event): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(dropdownName: string, event: Event): void {
    if (this.activeDropdown === dropdownName) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdownName;
    }
  }
}
```

---

### 3. **Footer Component**
📍 `src/app/components/shared/footer/`

**Zweck:** Die Fußzeile der Website mit Kontaktdaten und wichtigen Links.

**Was macht sie:**
- Zeigt Firmendaten und Kontaktinformationen
- Enthält Social Media Links (Facebook, Instagram, LinkedIn)
- Listet wichtige Seiten-Links auf
- Zeigt das aktuelle Jahr im Copyright

**Inhalt:**
- **Linke Spalte:** Firmeninfo und Social Media
- **Mittlere Spalte:** Kontaktdaten (Adresse, Telefon, E-Mail)
- **Rechte Spalte:** Quick Links zu wichtigen Seiten

**Datenquelle:**
```typescript
export class FooterComponent implements OnInit {
  contactInfo!: ContactInfo;
  currentYear = new Date().getFullYear();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Holt Kontaktdaten vom DataService
    this.dataService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }
}
```

---

### 4. **Loading Component**
📍 `src/app/components/shared/loading/`

**Zweck:** Zeigt einen Ladebildschirm während Seitenwechseln oder beim Laden von Daten.

**Was macht sie:**
- Zeigt einen animierten Spinner
- Wird automatisch bei Navigation zwischen Seiten angezeigt
- Verschwindet nach einer kurzen Zeit
- Verhindert, dass Nutzer leere Seiten sehen

**Funktionsweise:**
```typescript
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Reagiert auf Router-Events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showLoading();
        setTimeout(() => this.hideLoading(), 500);
      });
  }

  showLoading(): void {
    this.isLoading = true;
  }

  hideLoading(): void {
    this.isLoading = false;
  }
}
```

**Visuelle Elemente:**
- Drehender Kreis in Firmenfarben
- Text "Laden..."
- Transparenter Hintergrund mit Blur-Effekt

---

### 5. **Progress Indicator Component**
📍 `src/app/components/shared/progress-indicator/`

**Zweck:** Zeigt den Fortschritt in mehrstufigen Prozessen (z.B. Badrechner).

**Was macht sie:**
- Zeigt den aktuellen Schritt von X Gesamtschritten
- Visualisiert den Fortschritt als Balken und Kreise
- Färbt abgeschlossene Schritte grün
- Hebt den aktuellen Schritt hervor

**Eingabe-Parameter:**
```typescript
@Component({
  selector: 'app-progress-indicator'
})
export class ProgressIndicatorComponent {
  @Input() currentStep: number = 1;      // Aktueller Schritt
  @Input() totalSteps: number = 5;       // Gesamtanzahl Schritte
  @Input() steps: string[] = [           // Namen der Schritte
    'Ausstattung',
    'Qualität', 
    'Fliesen',
    'Heizung',
    'Kontakt'
  ];

  get progressPercentage(): number {
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }
}
```

**Template Verwendung:**
```html
<app-progress-indicator 
  [currentStep]="2" 
  [totalSteps]="5">
</app-progress-indicator>
```

---

### 6. **Navigation Buttons Component**
📍 `src/app/components/shared/navigation-buttons/`

**Zweck:** Standardisierte Vor- und Zurück-Buttons für mehrseitige Formulare.

**Was macht sie:**
- Zeigt "Zurück" und "Weiter" Buttons
- Auf der letzten Seite: "Kostenlose Beratung anfordern" statt "Weiter"
- Kann Buttons aktivieren/deaktivieren
- Sendet Events an die Eltern-Komponente

**Steuerung:**
```typescript
export class NavigationButtonsComponent {
  @Input() canGoBack: boolean = false;    // Zurück-Button verfügbar?
  @Input() canGoNext: boolean = true;     // Weiter-Button verfügbar?
  @Input() canSubmit: boolean = true;     // Submit-Button verfügbar?
  @Input() isLastPage: boolean = false;   // Ist das die letzte Seite?

  @Output() goBack = new EventEmitter<void>();
  @Output() goNext = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
}
```

**Verwendung:**
```html
<app-navigation-buttons
  [canGoBack]="currentStep > 1"
  [canGoNext]="isValid"
  [isLastPage]="currentStep === 5"
  (goBack)="previousStep()"
  (goNext)="nextStep()"
  (submit)="submitForm()">
</app-navigation-buttons>
```

---

### 7. **Image Checkbox Component**
📍 `src/app/components/shared/image-checkbox/`

**Zweck:** Eine Checkbox mit Bild, Label und optionalem Info-Button für Produktauswahl.

**Was macht sie:**
- Zeigt ein Produktbild mit Checkbox-Overlay
- Klick auf das ganze Element = Auswahl
- Optional: Info-Button für Details
- Visuelles Feedback bei Auswahl (orange Rahmen)

**Parameter:**
```typescript
export class ImageCheckboxComponent {
  @Input() selected: boolean = false;        // Ist ausgewählt?
  @Input() imageUrl: string = '';           // Bild-URL
  @Input() label: string = '';              // Produktname
  @Input() hasPopup: boolean = false;       // Info-Button zeigen?

  @Output() selectionChange = new EventEmitter<boolean>();
  @Output() openPopup = new EventEmitter<void>();

  toggle(): void {
    this.selected = !this.selected;
    this.selectionChange.emit(this.selected);
  }
}
```

**Fallback für kaputte Bilder:**
```typescript
onImageError(event: any): void {
  // Zeigt "Bild nicht verfügbar" SVG
  event.target.src = 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="120">
      <rect width="200" height="120" fill="#f8f9fa"/>
      <text x="100" y="60" text-anchor="middle">Bild nicht verfügbar</text>
    </svg>
  `);
}
```

**Verwendung:**
```html
<app-image-checkbox
  [imageUrl]="product.image"
  [label]="product.name"
  [selected]="product.selected"
  [hasPopup]="true"
  (selectionChange)="onProductSelect($event)"
  (openPopup)="showProductDetails()">
</app-image-checkbox>
```

---

### 8. **Range Slider Component**
📍 `src/app/components/shared/range-slider/`

**Zweck:** Ein Schieberegler für Wertbereiche (z.B. Quadratmeter, Budget).

**Was macht sie:**
- Ermöglicht Auswahl zwischen Min- und Max-Wert
- Zeigt aktuellen Wert prominent an
- Funktioniert mit Angular Forms (ControlValueAccessor)
- Anpassbare Einheit (m², €, etc.)

**Konfiguration:**
```typescript
export class RangeSliderComponent implements ControlValueAccessor {
  @Input() label: string = '';           // Beschriftung
  @Input() min: number = 0;              // Minimum
  @Input() max: number = 100;            // Maximum  
  @Input() step: number = 1;             // Schrittgröße
  @Input() unit: string = '';            // Einheit (m², €)
  @Input() value: number = 0;            // Aktueller Wert

  @Output() valueChange = new EventEmitter<number>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }
}
```

**Integration in Formulare:**
```html
<app-range-slider 
  label="Badgröße"
  [min]="5" 
  [max]="30" 
  unit="m²"
  formControlName="size">
</app-range-slider>
```

---

### 9. **Popup Modal Component**
📍 `src/app/components/shared/popup-modal/`

**Zweck:** Ein Modal-Dialog zur Auswahl zwischen verschiedenen Optionen mit Bildern.

**Was macht sie:**
- Zeigt Optionen in einem Overlay-Fenster
- Jede Option hat Bild, Titel und Beschreibung
- Single-Select: Nur eine Option wählbar
- Bestätigung oder Abbruch möglich

**Datenstruktur:**
```typescript
interface EquipmentOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  selected: boolean;
}
```

**Component:**
```typescript
export class PopupModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() options: EquipmentOption[] = [];
  
  @Output() optionSelected = new EventEmitter<EquipmentOption>();
  @Output() modalClosed = new EventEmitter<void>();

  selectOption(option: EquipmentOption): void {
    // Clear all selections first
    this.options.forEach(opt => opt.selected = false);
    // Select the clicked option
    option.selected = true;
  }

  confirm(): void {
    const selectedOption = this.options.find(option => option.selected);
    if (selectedOption) {
      this.optionSelected.emit(selectedOption);
    }
    this.close();
  }
}
```

---

### 10. **Bathroom Configurator Component**
📍 `src/app/components/shared/bathroom-configurator/`

**Zweck:** Die Hauptkomponente des Badkonfigurators mit Hero-Section und Router-Outlet.

**Was macht sie:**
- Zeigt eine eindrucksvolle Eingangsseite für den Badrechner
- Enthält Hero-Section mit Titel, Beschreibung und Features
- Stellt Router-Outlet für Unter-Seiten bereit
- Synchronisiert Navigation mit dem NavigationBadrechnerService

**Hero-Features:**
- ✅ Kostenlose Beratung
- ✅ Individuelle Planung  
- ✅ Hochwertige Materialien
- ✅ Persönliche Betreuung

**Navigation-Synchronisation:**
```typescript
export class BathroomConfiguratorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private NavigationBadrechnerService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
    // Router Events verfolgen um Navigation Service zu synchronisieren
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        const pageNumber = parseInt(urlSegments[urlSegments.length - 1]);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= 5) {
          this.NavigationBadrechnerService.navigateToPage(pageNumber);
        }
      });

    // Initial zur ersten Seite navigieren
    if (this.router.url === '/badrechner' || this.router.url === '/badrechner/') {
      this.NavigationBadrechnerService.navigateToPage(1);
    }
  }
}
```

---

## 🎨 UI Components (Benutzeroberflächen-Komponenten)

Diese Komponenten erstellen die Hauptinhalte der Website.

### 1. **Hero Section Component**
📍 `src/app/components/ui/hero-section/`

**Zweck:** Der große, eindrucksvolle Bereich ganz oben auf der Startseite.

**Was macht sie:**
- Zeigt den Haupttitel und Untertitel der Website
- Hat zwei Call-to-Action Buttons
- Animierte Hintergrundelemente (nur auf Desktop)
- Floating Icons für visuelle Attraktivität

**Inhalt:**
- **Titel:** "Moderne Sanitär- & Heizungstechnik"
- **Untertitel:** Kurze Beschreibung der Dienstleistungen
- **Button 1:** "Jetzt Beratung anfragen" (orange)
- **Button 2:** "Dienstleistungen entdecken" (transparent)

**Component:**
```typescript
export class HeroSectionComponent implements OnInit {
  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.animationService.observeFadeIn();
  }

  scrollToServices(): void {
    this.animationService.smoothScrollTo('services');
  }
}
```

**CSS Animationen:**
```scss
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes floatIcons {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}
```

---

### 2. **Service Card Component**
📍 `src/app/components/ui/service-card/`

**Zweck:** Zeigt eine einzelne Dienstleistung als ansprechende Karte an.

**Was macht sie:**
- Präsentiert Dienstleistungen mit Icon, Titel und Beschreibung
- Listet wichtige Features auf
- "Mehr erfahren" Button zu Detailseite
- Hover-Effekte für Interaktivität

**Datenstruktur:**
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;           // FontAwesome CSS-Klasse
  features?: string[];    // Liste der Features
}
```

**Component:**
```typescript
export class ServiceCardComponent {
  @Input() service!: Service;
  @Input() featured = false;
}
```

**Template Struktur:**
```html
<div class="service-card" [class.featured]="featured">
  <div class="service-icon">
    <i [class]="service.icon"></i>
  </div>
  
  <div class="service-content">
    <h3 class="service-title">{{ service.title }}</h3>
    <p class="service-description">{{ service.description }}</p>
    
    <ul class="service-features" *ngIf="service.features">
      <li *ngFor="let feature of service.features">
        <i class="fas fa-check"></i>
        {{ feature }}
      </li>
    </ul>
    
    <div class="service-footer">
      <a [routerLink]="'/services/' + service.id" class="btn btn-service">
        Mehr erfahren
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</div>
```

**Besonderheiten:**
- Kann als "featured" markiert werden (andere Farbe)
- Responsive Design für alle Bildschirmgrößen
- Konsistente Höhe auch bei unterschiedlich langem Content

---

### 3. **Team Card Component**
📍 `src/app/components/ui/team-card/`

**Zweck:** Stellt ein Teammitglied mit Foto und Informationen vor.

**Was macht sie:**
- Zeigt Profilbild oder Standard-Avatar
- Name, Position und Beschreibung
- Spezialisierungen als farbige Tags
- Erfahrung in Jahren

**TeamMember Interface:**
```typescript
interface TeamMember {
  firstName: string;
  lastName: string;
  position: string;
  description: string;
  image?: string;             // Optional: Profilbild
  specialties?: string[];     // z.B. ["Heizung", "Solar"]
  experience: number;         // Jahre Berufserfahrung
}
```

**Component:**
```typescript
export class TeamCardComponent {
  @Input() teamMember!: TeamMember;
}
```

**Avatar-Fallback:**
```html
<div class="team-avatar">
  <img *ngIf="teamMember.image; else defaultAvatar" 
       [src]="teamMember.image" 
       [alt]="teamMember.firstName + ' ' + teamMember.lastName">
  <ng-template #defaultAvatar>
    <i class="fas fa-user"></i>
  </ng-template>
</div>
```

**Specialty Tags:**
```html
<div class="specialty-tags">
  <span *ngFor="let specialty of teamMember.specialties" class="specialty-tag">
    {{ specialty }}
  </span>
</div>
```

---

### 4. **Contact Form Component**
📍 `src/app/components/ui/contact-form/`

**Zweck:** Ein vollständiges Kontaktformular für Kundenanfragen.

**Was macht sie:**
- Sammelt alle wichtigen Kontaktdaten
- Validiert Eingaben (E-Mail, Pflichtfelder)
- Dropdown für verschiedene Beratungsthemen
- Optional: "Dringende Anfrage" Checkbox
- Zeigt Erfolgsbestätigung nach dem Senden

**Formular-Setup:**
```typescript
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  serviceOptions = [
    { value: 'heating', label: 'Heizungsbau' },
    { value: 'bathroom', label: 'Bäderbau' },
    { value: 'installation', label: 'Installation' },
    { value: 'emergency', label: 'Notdienst' },
    { value: 'consultation', label: 'Beratung' }
  ];

  constructor(private fb: FormBuilder) {}

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],                    // Optional
      service: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      urgent: [false]                 // Checkbox
    });
  }
}
```

**Validierung:**
```typescript
isFieldInvalid(fieldName: string): boolean {
  const field = this.contactForm.get(fieldName);
  return !!(field && field.invalid && field.touched);
}

getFieldError(fieldName: string): string {
  const field = this.contactForm.get(fieldName);
  if (field?.errors) {
    if (field.errors['required']) return `${fieldName} ist erforderlich`;
    if (field.errors['email']) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    if (field.errors['minlength']) return `${fieldName} ist zu kurz`;
  }
  return '';
}
```

**Submit Handling:**
```typescript
onSubmit(): void {
  if (this.contactForm.valid) {
    this.isSubmitting = true;
    const formData: ContactForm = this.contactForm.value;
    
    // API Call simulation
    setTimeout(() => {
      console.log('Form submitted:', formData);
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
    }, 2000);
  } else {
    this.markFormGroupTouched();
  }
}
```

---

## 🛁 Badrechner System (Überblick)

Der Badrechner ist ein komplexes 5-Schritte System für die Badplanung.

### Hauptkomponente: Bathroom Configurator

**Zweck:** Die zentrale Komponente für den interaktiven Badkonfigurator.

**Was der Badrechner macht:**
1. **Schritt 1:** Ausstattung auswählen (WC, Dusche, Badewanne, etc.)
2. **Schritt 2:** Qualitätsstufe wählen (Basic, Comfort, Premium)
3. **Schritt 3:** Fliesen und Materialien
4. **Schritt 4:** Heizung und Belüftung
5. **Schritt 5:** Kontaktdaten für Angebot

**Kernfunktionen:**
- **Progress Tracking:** Zeigt Fortschritt in Prozent
- **Navigation:** Vor/Zurück zwischen den Schritten
- **Datenverwaltung:** Speichert Auswahl zwischen Schritten
- **Responsive:** Funktioniert auf allen Geräten

**Router-Integration:**
```typescript
// URLs: /badrechner/1, /badrechner/2, /badrechner/3, /badrechner/4, /badrechner/5
ngOnInit(): void {
  if (this.router.url === '/badrechner' || this.router.url === '/badrechner/') {
    this.NavigationBadrechnerService.navigateToPage(1);
  }
}
```

**Service Integration:**
```typescript
constructor(
  private router: Router,
  private NavigationBadrechnerService: NavigationBadrechnerService
) {}
```

---

## 🔄 Wie die Komponenten zusammenarbeiten

### 1. **Hauptlayout:**
```
Header (immer sichtbar)
├── Navigation (im Header)
└── Router-Outlet (wechselnder Inhalt)
    ├── Hero Section (nur Startseite)
    ├── Service Cards (Dienstleistungen)
    ├── Team Cards (Team-Seite)
    ├── Contact Form (Kontakt-Seite)
    └── Bathroom Configurator (Badrechner)
Footer (immer sichtbar)
```

### 2. **Badrechner-Flow:**
```
Bathroom Configurator (Hero + Navigation)
├── Step 1: Equipment Selection
├── Step 2: Quality Selection
├── Step 3: Tiles Selection
├── Step 4: Heating Selection
└── Step 5: Contact Form
```

### 3. **Shared Components Verwendung:**
- **Progress Indicator:** Nur im Badrechner
- **Navigation Buttons:** Nur im Badrechner
- **Image Checkbox:** Für Produktauswahl
- **Range Slider:** Für Größen/Budget
- **Popup Modal:** Für Produktdetails
- **Loading:** Bei allen Seitenwechseln

### 4. **Datenfluss:**
```
Parent Component
├── Service (DataService)
├── Child Component (@Input)
├── User Interaction
├── Child Component (@Output)
└── Parent Component (Event Handler)
```

---

## 📱 Responsive Design

Alle Komponenten sind für verschiedene Bildschirmgrößen optimiert:

### **Breakpoints:**
- **SM (Small):** 576px+ (Smartphones)
- **MD (Medium):** 768px+ (Tablets)
- **LG (Large):** 992px+ (Desktop)
- **XL (Extra Large):** 1200px+ (Große Bildschirme)

### **Typische Anpassungen:**

**Mobile (< 768px):**
- Vereinfachte Navigation (Hamburger-Menü)
- Gestapelte Layouts (Spalten untereinander)
- Größere Touch-Targets (min. 44px)
- Kompaktere Abstände

**Tablet (768px - 991px):**
- Zweispaltige Layouts
- Kompromiss zwischen Desktop und Mobile
- Touch-optimierte Bedienung

**Desktop (992px+):**
- Mehrspaltige Layouts
- Hover-Effekte und Animationen
- Dropdown-Menüs bei Hover
- Größere Abstände und Schriftgrößen

### **SCSS Mixins für Responsive Design:**
```scss
// Beispiel aus den Komponenten
@include mi.media-down(sm) {
  .component {
    padding: 1rem;
    font-size: 0.8rem;
  }
}

@include mi.media-up(md) {
  .component {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

@include mi.media-up(lg) {
  .component {
    padding: 2rem;
    font-size: 1.2rem;
  }
}
```

---

## 🎯 Verwendung für Anfänger

### **Eine neue Komponente verwenden:**

#### 1. **Import hinzufügen:**
```typescript
import { ServiceCardComponent } from './components/ui/service-card/service-card.component';
```

#### 2. **In Component einbinden:**
```typescript
@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [ServiceCardComponent]  // Bei Standalone Components
})
export class MyPageComponent {
  // Component Logic
}
```

#### 3. **Im Template verwenden:**
```html
<app-service-card 
  [service]="myService" 
  [featured]="true">
</app-service-card>
```

### **Daten an Komponenten übergeben:**

```typescript
// Im Parent Component
export class ParentComponent {
  myService: Service = {
    id: 'heating',
    title: 'Heizungsbau',
    description: 'Moderne Heizsysteme für jeden Bedarf...',
    icon: 'fas fa-fire',
    features: ['Gasheizung', 'Wärmepumpe', 'Solar']
  };
}
```

### **Events von Komponenten empfangen:**

```html
<app-navigation-buttons
  [canGoBack]="currentStep > 1"
  [canGoNext]="canProceed"
  [isLastPage]="currentStep === totalSteps"
  (goBack)="previousStep()"
  (goNext)="nextStep()"
  (submit)="submitForm()">
</app-navigation-buttons>
```

```typescript
// Event Handler im Parent Component
export class ParentComponent {
  currentStep = 1;
  totalSteps = 5;

  get canProceed(): boolean {
    // Logik ob weiter geklickt werden kann
    return this.isCurrentStepValid();
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  submitForm(): void {
    // Formular absenden
    console.log('Form submitted');
  }
}
```

### **Formulare mit Custom Components:**

```html
<!-- In einem Reactive Form -->
<form [formGroup]="myForm">
  <app-range-slider
    label="Badgröße"
    [min]="5"
    [max]="30"
    unit="m²"
    formControlName="size">
  </app-range-slider>
  
  <app-image-checkbox
    *ngFor="let product of products"
    [imageUrl]="product.image"
    [label]="product.name"
    [selected]="product.selected"
    (selectionChange)="onProductSelect(product, $event)">
  </app-image-checkbox>
</form>
```

---

## 🛠️ Entwickler-Tipps

### **Best Practices:**

1. **Komponenten klein halten:** Jede Komponente sollte nur eine Aufgabe erfüllen
2. **Input/Output verwenden:** Für Kommunikation zwischen Parent und Child
3. **Reactive Forms:** Für komplexe Formulare mit Validierung
4. **Services für Daten:** Business Logic gehört in Services, nicht in Components
5. **OnPush Change Detection:** Für bessere Performance bei großen Listen

### **Häufige Fehler vermeiden:**

1. **Vergessene Unsubscribe:** Immer Observables in ngOnDestroy() beenden
2. **Fehlende Null-Checks:** Template Guards verwenden (`*ngIf` vor Datenzugriff)
3. **Nicht-responsive Design:** Immer alle Bildschirmgrößen testen
4. **Fehlende Accessibility:** Alt-Texte, Labels und ARIA-Attribute nicht vergessen

### **Debugging-Tipps:**

```typescript
// Lifecycle Hooks zum Debuggen
ngOnInit(): void {
  console.log('Component initialized', this.inputData);
}

ngOnChanges(changes: SimpleChanges): void {
  console.log('Input changed', changes);
}

ngOnDestroy(): void {
  console.log('Component destroyed');
}
```

---

## 📋 Zusammenfassung

Diese Dokumentation zeigt alle wichtigen Komponenten der Mitra Sanitär Website:

### **Shared Components (10 Stück):**
- Header, Navigation, Footer (Layout)
- Loading, Progress Indicator (UX)
- Navigation Buttons, Image Checkbox, Range Slider, Popup Modal (Forms)
- Bathroom Configurator (Haupt-Feature)

### **UI Components (4 Stück):**
- Hero Section (Startseite)
- Service Card (Dienstleistungen)
- Team Card (Team-Präsentation)
- Contact Form (Kontakt)

### **Besondere Features:**
- Vollständig responsive Design
- Badrechner mit 5 Schritten
- Umfangreiche Formulare mit Validierung
- Moderne Animationen und Hover-Effekte
- Touch-optimierte Mobile-Navigation

### **Technologien:**
- Angular Standalone Components
- Reactive Forms
- SCSS mit Mixins
- FontAwesome Icons
- TypeScript mit strikter Typisierung

Diese Komponenten arbeiten zusammen, um eine moderne, benutzerfreundliche Website für den Sanitärbetrieb zu erstellen, die sowohl informiert als auch zur Kontaktaufnahme motiviert.