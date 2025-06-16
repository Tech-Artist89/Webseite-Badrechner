import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  service!: Service;
  
  services = [
    {
      title: '24/7 Notdienst',
      description: 'Schnelle Hilfe bei Notfällen',
      icon: 'fas fa-clock',
//      response: 'Innerhalb 2 Stunden'
    },
    {
      title: 'Wartungsverträge',
      description: 'Regelmäßige Inspektion Ihrer Anlagen',
      icon: 'fas fa-calendar-check',
//      response: 'Jährlich'
    },
    {
      title: 'Rohrreinigung',
      description: 'Professionelle Rohrreinigung',
      icon: 'fas fa-broom',
//      response: 'Sofort verfügbar'
    },
    {
      title: 'Leckortung',
      description: 'Präzise Ortung von Wasserschäden',
      icon: 'fas fa-search',
//      response: 'Same Day Service'
    }
  ];

  emergencySteps = [
    'Hauptwasserhahn zudrehen',
    'Strom in betroffenen Bereichen ausschalten',
    'Wasser aufwischen und Möbel sichern',
    'Unseren Notdienst kontaktieren: 030 76008921'
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getServiceById('installation').subscribe(service => {
      if (service) this.service = service;
    });
  }
}