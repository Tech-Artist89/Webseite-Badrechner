# 7. 🔧 /pipes - Angular Pipes

## Was sind Pipes?

Pipes transformieren Daten für die Anzeige im Template, ohne die ursprünglichen Daten zu ändern.

## Dateien:

- `phone.pipe.ts` - Telefonnummer-Formatierung
- `safe-html.pipe.ts` - HTML-Sanitization
- `truncate.pipe.ts` - Text-Kürzung

## 📝 Pipe-Implementierungen:

### 📱 PhonePipe

```typescript
@Pipe({ name: 'phone', standalone: true })
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    // Formatiert deutsche Telefonnummern
    
    // Input: "4930123456789"
    // Output: "+49 (0) 301 23456789"
    
    // Input: "030123456"
    // Output: "0301 23456"
  }
}
```

### 🔒 SafeHtmlPipe

```typescript
@Pipe({ name: 'safeHtml', standalone: true })
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string): SafeHtml {
    // Macht HTML-Content sicher für [innerHTML]
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
```

### ✂️ TruncatePipe

```typescript
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100, trail: string = '...'): string {
    // Kürzt langen Text
    
    // Input: "Das ist ein sehr langer Text..."
    // Output: "Das ist ein sehr..."
  }
}
```

## 🎯 Template-Verwendung:

```html
<!-- Telefonnummer formatieren -->
<p>Telefon: {{ contact.phone | phone }}</p>

<!-- HTML sicher anzeigen -->
<div [innerHTML]="htmlContent | safeHtml"></div>

<!-- Text kürzen -->
<p>{{ description | truncate:50:'...' }}</p>

<!-- Mit Custom-Parameter -->
<p>{{ longText | truncate:200:'[mehr]' }}</p>
```