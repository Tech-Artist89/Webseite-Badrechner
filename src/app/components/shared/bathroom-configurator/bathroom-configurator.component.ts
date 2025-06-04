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
  styles: [`
    .configurator-container {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .hero-section {
      background: linear-gradient(135deg, 
        var(--primary-color, #1b3244) 0%, 
        darken(var(--primary-color, #1b3244), 10%) 100%);
      color: var(--text-light, #ffffff);
      padding: 6rem 0 4rem;
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .hero-title i {
      color: var(--cta-color, #ef804e);
      font-size: 3rem;
    }

    .hero-subtitle {
      font-size: 1.4rem;
      margin-bottom: 3rem;
      opacity: 0.95;
      line-height: 1.7;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-features {
      margin-top: 3rem;
    }

    .feature-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .feature-item:hover {
      background: rgba(239, 128, 78, 0.2);
      border-color: var(--cta-color, #ef804e);
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    .feature-item i {
      color: var(--cta-color, #ef804e);
      font-size: 2rem;
      margin-bottom: 5px;
    }

    .feature-item span {
      text-align: center;
      line-height: 1.3;
    }

    .configurator-content {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.02) 0%, 
        rgba(255, 255, 255, 0.05) 100%);
      min-height: calc(100vh - 300px);
      padding: 0;
      position: relative;
      z-index: 1;
    }

    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .floating-element {
      position: absolute;
      border-radius: 50%;
      background: rgba(239, 128, 78, 0.1);
      animation: float 8s ease-in-out infinite;
    }

    .element-1 {
      width: 200px;
      height: 200px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .element-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 3s;
    }

    .element-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 80%;
      animation-delay: 6s;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.3;
      }
      25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 0.5;
      }
      50% {
        transform: translateY(-40px) rotate(180deg);
        opacity: 0.7;
      }
      75% {
        transform: translateY(-20px) rotate(270deg);
        opacity: 0.5;
      }
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0 2rem;
      }
      
      .hero-title {
        font-size: 2.5rem;
        flex-direction: column;
        gap: 10px;
      }

      .hero-title i {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
      
      .configurator-content {
        padding: 0;
        min-height: auto;
      }

      .feature-item {
        margin-bottom: 1rem;
        padding: 15px;
      }

      .feature-item i {
        font-size: 1.5rem;
      }

      .feature-item span {
        font-size: 0.95rem;
      }

      .floating-element {
        display: none;
      }
    }

    @media (max-width: 576px) {
      .hero-features .row > div {
        margin-bottom: 15px;
      }
    }
  `]
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