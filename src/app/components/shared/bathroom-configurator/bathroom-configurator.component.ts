// src/app/components/badrechner/bathroom-configurator/bathroom-configurator.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';

@Component({
  selector: 'app-bathroom-configurator',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="configurator-container">
      <div class="hero-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-10 mx-auto text-center">
              <h1 class="hero-title">
                <i class="fas fa-bath"></i>
                Ihr Traumbad planen
              </h1>
              <p class="hero-subtitle">
                Gestalten Sie Ihr perfektes Badezimmer in nur 5 einfachen Schritten. 
                Unser Konfigurator hilft Ihnen dabei, alle wichtigen Entscheidungen zu treffen 
                und erstellt Ihnen ein individuelles Angebot.
              </p>
              <div class="hero-features">
                <div class="row">
                  <div class="col-md-3 col-6">
                    <div class="feature-item">
                      <i class="fas fa-gift"></i>
                      <span>Kostenlose Beratung</span>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="feature-item">
                      <i class="fas fa-drafting-compass"></i>
                      <span>Individuelle Planung</span>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="feature-item">
                      <i class="fas fa-gem"></i>
                      <span>Hochwertige Materialien</span>
                    </div>
                  </div>
                  <div class="col-md-3 col-6">
                    <div class="feature-item">
                      <i class="fas fa-handshake"></i>
                      <span>Persönliche Betreuung</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="configurator-content">
        <router-outlet></router-outlet>
      </div>

      <!-- Background Elements -->
      <div class="floating-elements">
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
      </div>
    </div>
  `,
  styleUrls: ['./bathroom-configurator.component.scss']

})
export class BathroomConfiguratorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private NavigationBadrechnerService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
    // Router Events verfolgen um Navigation Service zu synchronisieren
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        const pageNumber = parseInt(urlSegments[urlSegments.length - 1]);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= 5) {
          this.NavigationBadrechnerService.navigateToPage(pageNumber);
        }
      });

    // Initial zur ersten Seite navigieren, falls auf Hauptroute
    if (this.router.url === '/badrechner' || this.router.url === '/badrechner/') {
      this.NavigationBadrechnerService.navigateToPage(1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
