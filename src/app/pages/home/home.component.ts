import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from '../../components/ui/hero-section/hero-section.component';
import { ServiceCardComponent } from '../../components/ui/service-card/service-card.component';
import { DataService } from '../../services/data.service';
import { Service } from '../../models/service';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSectionComponent, ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  constructor(
    private dataService: DataService,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    console.log('🚀 HomeComponent initialized');
    this.loadServices();
    this.animationService.observeFadeIn();
  }

  private loadServices(): void {
    console.log('📡 Loading services...');
    this.dataService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
        console.log('✅ Services loaded successfully:', services);
        console.log('📊 Number of services:', services.length);
        
        // Log each service for debugging
        services.forEach((service, index) => {
          console.log(`Service ${index + 1}:`, service);
        });
      },
      error: (error) => {
        console.error('❌ Error loading services:', error);
        this.isLoading = false;
        
        // Create fallback services if loading fails
        this.services = [
          {
            id: 'heating',
            title: 'Heizungsbau',
            description: 'Moderne Heizungsanlagen für optimale Energieeffizienz',
            icon: 'fas fa-fire',
            features: ['Gasheizungen', 'Wärmepumpen', 'Solarthermie']
          },
          {
            id: 'bathroom',
            title: 'Bäderbau',
            description: 'Komplette Badezimmerplanung und -umsetzung',
            icon: 'fas fa-bath',
            features: ['Badplanung', 'Fliesenlegen', 'Sanitärinstallation']
          },
          {
            id: 'installation',
            title: 'Installation',
            description: 'Professionelle Installation und Wartung',
            icon: 'fas fa-wrench',
            features: ['Rohrleitungen', 'Armaturen', 'Wartung']
          }
        ];
        console.log('🔄 Using fallback services:', this.services);
      }
    });
  }

  trackByServiceId(index: number, service: Service): string {
    return service.id;
  }
}