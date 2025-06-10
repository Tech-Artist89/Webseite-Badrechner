# 5. 🔗 /interfaces - TypeScript Interfaces

## Was sind Interfaces?

Interfaces definieren die Struktur von Objekten und sorgen für Typsicherheit.

## Datei:

- `badrechner.ts` - Badkonfigurator-Datenstrukturen

## 📝 Interface-Struktur:

### 🛠️ EquipmentOption

```typescript
interface EquipmentOption {
  id: string;           // Eindeutige ID
  name: string;         // Anzeigename
  description: string;  // Beschreibung
  imageUrl: string;     // Bild-URL
  selected: boolean;    // Ausgewählt?
}
```

### 🏠 EquipmentItem

```typescript
interface EquipmentItem {
  id: string;
  name: string;
  selected: boolean;
  imageUrl: string;
  iconUrl: string;
  popupDetails: {
    options: EquipmentOption[];  // Unter-Optionen
  };
}
```

### ⭐ QualityLevel

```typescript
interface QualityLevel {
  id: string;           // 'classic', 'hochwertig', 'premium'
  name: string;
  description: string;
  imageUrl: string;
  selected: boolean;
  features: string[];   // Liste der Features
}
```

### 👤 ContactData

```typescript
interface ContactData {
  salutation: 'Herr' | 'Frau';  // Streng typisiert
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
```

### 🏺 TileOption & 🔥 HeatingOption

```typescript
interface TileOption {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
  type: 'floor' | 'wall';  // Boden oder Wand
}

interface HeatingOption {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
}
```

### 🛁 BathroomData (Haupt-Interface)

```typescript
interface BathroomData {
  equipment: EquipmentItem[];      // Ausstattung
  bathroomSize: number;            // Größe in m²
  qualityLevel: QualityLevel | null; // Qualitätsstufe
  floorTiles: string[];            // Bodenfliesen-IDs
  wallTiles: string[];             // Wandfliesen-IDs
  heating: string[];               // Heizungs-IDs
  additionalInfo: string[];        // Zusatzinfos
  comments: string;                // Kommentare
  contactData: ContactData;        // Kontaktdaten
}
```

## 🎯 Verwendung:

```typescript
// Typsichere Funktionen
function updateBathroom(data: BathroomData): void {
  // TypeScript prüft automatisch die Struktur
}

// Partial Updates möglich
function updateContact(updates: Partial<ContactData>): void {
  // Nur bestimmte Felder aktualisieren
}
```