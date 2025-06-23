import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  milestones = [
    {
      year: 'Sep. 2024',
      title: 'Firmengründung',
      description: 'Patrick van Dahlen gründet das Unternehmen mit dem Fokus auf Qualität und Kundenzufriedenheit'
    },
    {
      year: 'Nov. 2024',
      title: 'Team-Erweiterung',
      description: 'Aufbau eines qualifizierten Teams aus Fachkräften und Meistern'
    },
    {
      year: 'Jan. 2025',
      title: 'Digitalisierung',
      description: 'Einführung modernster Planungstools und digitaler Prozesse'
    },
    {
      year: 'Feb. 2025',
      title: 'Nachhaltigkeit',
      description: 'Spezialisierung auf umweltfreundliche und energieeffiziente Lösungen'
    }
  ];

  values = [
    {
      icon: 'fas fa-handshake',
      title: 'Vertrauen',
      description: 'Ehrlichkeit und Transparenz in allen Geschäftsbeziehungen'
    },
    {
      icon: 'fas fa-award',
      title: 'Qualität',
      description: 'Höchste Standards bei Materialien und Ausführung'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Nachhaltigkeit',
      description: 'Umweltbewusste Lösungen für eine bessere Zukunft'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'Ständige Weiterentwicklung und modernste Technologien'
    }
  ];
}