import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceCardComponent } from '../../components/ui/service-card/service-card.component';
import { DataService } from '../../services/data.service';
import { Service } from '../../models/service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, RouterModule],
  template: `
    <div class="services-page">
      <!-- Page Header -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">Unsere Dienstleistungen</h1>
          <p class="page-subtitle">Umfassende Lösungen für alle Bereiche der Sanitär- und Heizungstechnik</p>
        </div>
      </section>
      
      <!-- Services Grid -->
      <section class="services-grid section">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-4" *ngFor="let service of services">
              <app-service-card [service]="service" [featured]="true"></app-service-card>
            </div>
          </div>
        </div>
      </section>

      <!-- Service Overview -->
      <section class="service-overview section">
        <div class="container">
          <h2 class="section-title">Warum Mitra Sanitär?</h2>
          <div class="row g-4">
            <div class="col-lg-4">
              <div class="overview-card">
                <div class="overview-icon">
                  <i class="fas fa-award"></i>
                </div>
                <h3>1+ Jahre Erfahrung</h3>
                <p>Langjährige Expertise in der Sanitär- und Heizungstechnik</p>
                <a routerLink="/about/company" class="btn-service">
                  Mehr erfahren <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="overview-card">
                <div class="overview-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <h3>24/7 Notdienst</h3>
                <p>Wir sind rund um die Uhr für Sie da</p>
                <a routerLink="/contact" class="btn-service">
                  Jetzt kontaktieren <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="overview-card">
                <div class="overview-icon">
                  <i class="fas fa-leaf"></i>
                </div>
                <h3>Nachhaltige Lösungen</h3>
                <p>Umweltfreundliche und energieeffiziente Technologien</p>
                <a routerLink="/services" class="btn-service">
                  Services entdecken <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getServices().subscribe(services => {
      this.services = services;
    });
  }
}