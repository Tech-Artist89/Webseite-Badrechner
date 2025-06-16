import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  jobOffers = [
    {
      title: 'Anlagenmechaniker (m/w/d)',
      type: 'Vollzeit',
      startDate: 'Sofort',
      description: 'Wir suchen einen erfahrenen Anlagenmechaniker für die Installation und Wartung von Heizungs- und Sanitäranlagen.',
      requirements: [
        'Abgeschlossene Ausbildung als Anlagenmechaniker',
        'Mindestens 3 Jahre Berufserfahrung',
        'Führerschein Klasse B',
        'Zuverlässigkeit und Teamfähigkeit'
      ],
      benefits: [
        'Attraktives Gehalt',
        'Firmenwagen',
        'Weiterbildungsmöglichkeiten',
        'Betriebliche Altersvorsorge'
      ]
    },
    {
      title: 'Auszubildender (m/w/d)',
      type: 'Ausbildung',
      startDate: 'August 2025',
      description: 'Starte deine Karriere als Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik bei uns.',
      requirements: [
        'Mittlere Reife oder vergleichbarer Abschluss',
        'Technisches Verständnis',
        'Handwerkliches Geschick',
        'Motivation und Lernbereitschaft'
      ],
      benefits: [
        'Qualifizierte Ausbildung',
        'Übernahmegarantie bei guten Leistungen',
        'Moderne Ausstattung',
        'Familiäres Arbeitsklima'
      ]
    },
//    {
//      title: 'Projektleiter (m/w/d)',
//      type: 'Vollzeit',
//      startDate: 'Ab sofort',
//      description: 'Zur Verstärkung unseres Teams suchen wir einen erfahrenen Projektleiter für die Koordination unserer Bauprojekte.',
//      requirements: [
//        'Abgeschlossenes Studium oder Meisterausbildung',
//        'Mehrjährige Berufserfahrung in der Projektleitung',
//        'Führungserfahrung',
//        'Organisationstalent'
//      ],
//      benefits: [
//        'Führungsposition',
//        'Eigenverantwortliches Arbeiten',
//        'Flexible Arbeitszeiten',
//        'Leistungsgerechte Vergütung'
//      ]
//    }
  ];

  benefits = [
    {
      icon: 'fas fa-euro-sign',
      title: 'Attraktive Vergütung',
      description: 'Leistungsgerechte Bezahlung und Benefits'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Weiterbildung',
      description: 'Regelmäßige Schulungen und Fortbildungen'
    },
    {
      icon: 'fas fa-users',
      title: 'Teamgeist',
      description: 'Familiäres Arbeitsklima und starker Zusammenhalt'
    },
    {
      icon: 'fas fa-clock',
      title: 'Work-Life-Balance',
      description: 'Flexible Arbeitszeiten und faire Urlaubsregelung'
    },
    {
      icon: 'fas fa-car',
      title: 'Firmenwagen',
      description: 'Moderne Fahrzeugflotte für unsere Mitarbeiter'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Sicherheit',
      description: 'Betriebliche Altersvorsorge und Sozialleistungen'
    }
  ];
}