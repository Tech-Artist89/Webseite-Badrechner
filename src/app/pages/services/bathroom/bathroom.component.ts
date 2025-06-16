import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-bathroom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.scss']
})
export class BathroomComponent implements OnInit {
  service!: Service;
  
  bathroomServices = [
    {
      title: 'Komplette Badsanierung',
      description: 'Von der Planung bis zur Fertigstellung',
      icon: 'fas fa-hammer',
//      duration: '5-10 Tage'
    },
    {
      title: 'Barrierefrei umbauen',
      description: `Sicherheit und Komfort für alle Altersgruppen.
Wir begleiten Sie durch den gesamten Umbauprozess`,
      icon: 'fas fa-universal-access',
//      duration: '3-7 Tage'
    },
    {
      title: 'Bodengleiche Dusche',
      description: 'vereint modernes Design mit barrierefreiem Komfort. Sie sorgt für ein großzügiges Raumgefühl im Bad',
      icon: 'fas fa-wifi',
//      duration: '1-2 Tage'
    },
    {
      title: '3D-Planung',
      description: 'Wir visualisieren kostenlos Ihr Traumbad für Sie. So sehen Sie schon heute, wie es morgen aussehen wird',
      icon: 'fas fa-cube',
      duration: 'Kostenlos'
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getServiceById('bathroom').subscribe(service => {
      if (service) this.service = service;
    });
  }
}