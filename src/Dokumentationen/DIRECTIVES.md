# 1. 🎯 /directives - Angular Direktiven

## Was sind Direktiven?

Direktiven sind spezielle Angular-Features, die das Verhalten von HTML-Elementen erweitern oder verändern können.

## Dateien im Ordner:

- `animate-on-scroll.directive.ts`
- `click-outside.directive.ts`
- `hover-effect.directive.ts`
- `lazy-load.directive.ts`
- `scroll-spy.directive.ts`

## 📝 Detaillierte Beschreibung:

### 🎬 AnimateOnScrollDirective

```typescript
@Directive({ selector: '[appAnimateOnScroll]' })
```

- **Zweck:** Elemente werden animiert, wenn sie in den sichtbaren Bereich scrollen
- **Funktionsweise:** Nutzt die IntersectionObserver API
- **Verwendung:** `<div appAnimateOnScroll>Inhalt</div>`
- **CSS-Klassen:** Fügt `fade-in` und `fade-in-visible` hinzu

### 👆 ClickOutsideDirective

```typescript
@Directive({ selector: '[clickOutside]' })
```

- **Zweck:** Erkennt Klicks außerhalb eines Elements
- **Event:** `(clickOutside)="function()"`
- **Verwendung:** Ideal für Dropdown-Menüs oder Modals
- **Beispiel:** `<div clickOutside (clickOutside)="closeMenu()">Menu</div>`

### ✨ HoverEffectDirective

```typescript
@Directive({ selector: '[appHoverEffect]' })
```

- **Zweck:** Fügt Hover-Animationen hinzu
- **Effekt:** Element bewegt sich 5px nach oben bei Hover
- **Transition:** Smooth 0.3s Animation
- **Verwendung:** `<div appHoverEffect>Hover mich!</div>`

### 📷 LazyLoadDirective

```typescript
@Directive({ selector: '[appLazyLoad]' })
```

- **Zweck:** Bilder werden erst geladen, wenn sie sichtbar werden
- **Performance:** Verbessert Ladezeiten
- **Verwendung:** `<img appLazyLoad="pfad/zum/bild.jpg">`
- **Funktionsweise:** Nutzt IntersectionObserver

### 👁️ ScrollSpyDirective

```typescript
@Directive({ selector: '[appScrollSpy]' })
```

- **Zweck:** Überwacht, ob Element im Viewport ist
- **Output:** `(inView)="onVisible($event)"`
- **Konfigurierbar:** `[threshold]="0.1"`
- **Verwendung:** Navigation-Highlighting, Analytics

## 🎯 Anwendung für Anfänger:

```html
<!-- Beispiel-Verwendung aller Direktiven -->
<div appAnimateOnScroll 
     appHoverEffect 
     appScrollSpy 
     (inView)="trackVisibility($event)"
     clickOutside 
     (clickOutside)="closeDropdown()">
  
  <img appLazyLoad="assets/images/bathroom.jpg" alt="Badezimmer">
  
</div>
```