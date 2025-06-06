import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-heating',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heating.component.html',
  styleUrls: ['./heating.component.scss']
})
export class HeatingComponent implements OnInit {
  service!: Service;
  
  heatingTypes = [
    {
      title: 'Wärmepumpen',
      description: 'Umweltfreundlich und effizient',
      icon: 'fas fa-leaf',
      features: ['Luft-Wasser-Wärmepumpe', 'Erdwärmepumpe', 'Hybrid-Systeme']
    },
    {
      title: 'Gasheizungen',
      description: 'Bewährte Technologie mit hohem Wirkungsgrad',
      icon: 'fas fa-fire',
      features: ['Brennwertkessel', 'Kombi-Thermen', 'Modulierende Systeme']
    },
    {
      title: 'Fußbodenheizung',
      description: 'Wohlige Wärme von unten für Ihr Zuhause',
      icon: 'fas fa-th',
      features: ['Gleichmäßige Wärme', 'Energieeffizient', 'Allergikerfreundlich']
    }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getServiceById('heating').subscribe(service => {
      if (service) this.service = service;
    });
  }
}