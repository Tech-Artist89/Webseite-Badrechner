# 6. 📊 /models - Datenmodelle

## Was sind Models?

Models definieren die Datenstrukturen für verschiedene Bereiche der Anwendung.

## Dateien:

- `contact.ts` - Kontakt-bezogene Modelle
- `service.ts` - Service-Modelle
- `team-member.ts` - Team-Mitglieder

## 📝 Model-Definitionen:

### 📞 Contact Models (contact.ts)

```typescript
interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;        // Optional
  subject: string;
  message: string;
  service?: string;      // Optional
  urgent?: boolean;      // Optional
}

interface ContactInfo {
  address: {
    street: string;      // "Borussiastraße 62a"
    city: string;        // "Berlin"
    zip: string;         // "12103"
    country: string;     // "Deutschland"
  };
  phone: string;         // "030 76008921"
  email: string;         // "hey@mitra-sanitaer.de"
  emergencyPhone: string;
  openingHours: {
    monday: string;      // "8:00 - 15:30"
    tuesday: string;
    // ... für jeden Wochentag
    sunday: string;      // "Geschlossen"
  };
}
```

### 🔧 Service Models (service.ts)

```typescript
interface Service {
  id: string;
  title: string;         // "Heizungsbau"
  description: string;
  icon: string;          // "fas fa-fire"
  features: string[];    // ["Wärmepumpen", "Gasheizungen"]
  price?: string;        // Optional
  duration?: string;     // Optional
  image?: string;        // Optional
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];   // Array von Services
}
```

### 👥 Team Member Model (team-member.ts)

```typescript
interface TeamMember {
  id: string;
  firstName: string;     // "Patrick"
  lastName: string;      // "van Dahlen"
  position: string;      // "Geschäftsführer"
  department: string;    // "Management"
  description: string;
  email?: string;        // Optional
  phone?: string;        // Optional
  image?: string;        // Optional
  specialties: string[]; // ["Heizungstechnik", "Projektmanagement"]
  experience: number;    // Jahre Erfahrung
}
```

## 🎯 Verwendung in Services:

```typescript
@Injectable()
export class DataService {
  private teamMembers: TeamMember[] = [
    {
      id: '1',
      firstName: 'Patrick',
      lastName: 'van Dahlen',
      position: 'Geschäftsführer',
      // ...weitere Properties
    }
  ];
  
  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.teamMembers);
  }
}
```