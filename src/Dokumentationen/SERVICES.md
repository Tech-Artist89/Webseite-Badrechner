# 8. ⚙️ /services - Angular Services

## Was sind Services?

Services enthalten Business-Logik, verwalten Daten und stellen Funktionalitäten für Components bereit.

## Service-Übersicht:

- `animation.service.ts` - Animationen
- `bathroom-data.service.ts` - Badkonfigurator-Daten
- `data.service.ts` - Allgemeine Daten
- `email.service.ts` - E-Mail-Versand
- `loading.service.ts` - Loading-States
- `meta.service.ts` - SEO Meta-Tags
- `navigation-badrechner.service.ts` - Navigation im Konfigurator
- `notification.service.ts` - Benachrichtigungen
- `pdf-generator.service.ts` - PDF-Generierung

## 📝 Detaillierte Service-Beschreibungen:

### 🎬 AnimationService

```typescript
@Injectable({ providedIn: 'root' })
export class AnimationService {
  // Überwacht Fade-In Animationen
  observeFadeIn(): void { /* Intersection Observer Logic */ }
  
  // Smooth Scroll zu Element
  smoothScrollTo(elementId: string): void { /* Scroll Logic */ }
  
  // Animierte Zahlen-Counter
  animateCounter(element: HTMLElement, targetValue: number): void { /* Animation Logic */ }
}
```

### 🛁 BathroomDataService (Kern-Service)

```typescript
@Injectable({ providedIn: 'root' })
export class BathroomDataService {
  private bathroomDataSubject = new BehaviorSubject<BathroomData>();
  public bathroomData$ = this.bathroomDataSubject.asObservable();
  
  // Equipment Management
  updateEquipmentSelection(equipmentId: string, selected: boolean): void
  updateEquipmentOption(equipmentId: string, optionId: string, selected: boolean): void
  
  // Bathroom Configuration
  updateBathroomSize(size: number): void
  updateQualityLevel(qualityLevel: QualityLevel): void
  updateFloorTiles(tiles: string[]): void
  updateWallTiles(tiles: string[]): void
  updateHeating(heating: string[]): void
  
  // Data Getters
  getQualityLevels(): QualityLevel[]
  getTileOptions(): { floor: TileOption[], wall: TileOption[] }
  getHeatingOptions(): HeatingOption[]
}
```

### 📧 EmailService

```typescript
@Injectable({ providedIn: 'root' })
export class EmailService {
  private readonly apiUrl = 'http://localhost:3000/api';
  
  // Backend-Verfügbarkeit prüfen
  private async checkBackendAvailability(): Promise<void>
  
  // PDF generieren (ohne E-Mail)
  async generatePDFOnly(data: any): Promise<{success: boolean, message: string}>
  
  // Hauptmethode: Badkonfiguration senden
  async sendBathroomConfiguration(data: any): Promise<{success: boolean, message: string}>
  
  // Fallback: Mailto-Link
  private handleFallback(data: any): any
  createMailtoLink(data: any): string
}
```

### 🔄 LoadingService

```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  show(): void    // Loading anzeigen
  hide(): void    // Loading verstecken
}
```

### 📍 NavigationBadrechnerService

```typescript
@Injectable({ providedIn: 'root' })
export class NavigationBadrechnerService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private readonly totalPages = 5;
  
  // Navigation
  navigateToNext(): void
  navigateToPrevious(): void
  navigateToPage(page: number): void
  
  // State Management
  getCurrentPage(): number
  canNavigateNext(): boolean
  canNavigatePrevious(): boolean
  getProgressPercentage(): number
}
```

### 🔔 NotificationService

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  
  // Notification Types
  success(title: string, message: string): void
  error(title: string, message: string): void
  warning(title: string, message: string): void
  info(title: string, message: string): void
  
  // Management
  show(notification: Omit<Notification, 'id'>): void
  remove(id: string): void
}
```

## 🎯 Service-Verwendung in Components:

```typescript
@Component({})
export class BadrechnerComponent {
  constructor(
    private bathroomDataService: BathroomDataService,
    private navigationService: NavigationBadrechnerService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit() {
    // Data abonnieren
    this.bathroomDataService.bathroomData$.subscribe(data => {
      this.bathroomData = data;
    });
  }
  
  onEquipmentSelect(equipmentId: string) {
    this.bathroomDataService.updateEquipmentSelection(equipmentId, true);
    this.notificationService.success('Erfolg', 'Ausstattung ausgewählt');
  }
  
  nextPage() {
    this.navigationService.navigateToNext();
  }
}
```