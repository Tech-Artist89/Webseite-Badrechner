// src/app/components/badrechner/page-two/page-two.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BathroomDataService } from '../../../services/bathroom-data.service';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';
import { ProgressIndicatorComponent } from '../../../components/shared/progress-indicator/progress-indicator.component';
import { NavigationButtonsComponent } from '../../../components/shared/navigation-buttons/navigation-buttons.component';
import { BathroomData, QualityLevel } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [
    CommonModule,
    ProgressIndicatorComponent,
    NavigationButtonsComponent
  ],
  template: `
    <div class="container mt-4">
      <app-progress-indicator [currentStep]="2" [totalSteps]="5"></app-progress-indicator>
      
      <div class="page-content">
        <h2 class="page-title">Welchen Qualitätsanspruch haben Sie?</h2>
        <p class="page-subtitle">Wählen Sie eine Qualitätsstufe aus</p>
        
        <div class="quality-grid">
          <div *ngFor="let quality of qualityLevels" class="quality-option">
            <div class="quality-card" 
                 [class.selected]="bathroomData.qualityLevel?.id === quality.id"
                 (click)="selectQuality(quality)">
              <img [src]="quality.imageUrl" [alt]="quality.name" class="quality-image">
              <div class="quality-content">
                <h4 class="quality-name">{{ quality.name }}</h4>
                <p class="quality-description">{{ quality.description }}</p>
                <button type="button" class="btn btn-info btn-sm" 
                        (click)="$event.stopPropagation(); openQualityDetails(quality)">
                  <i class="fas fa-info-circle"></i> Details anzeigen
                </button>
              </div>
              <div class="selection-indicator" *ngIf="bathroomData.qualityLevel?.id === quality.id">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
          </div>
        </div>

        <app-navigation-buttons
          [canGoBack]="true"
          [canGoNext]="canProceed()"
          [isLastPage]="false"
          (goBack)="navigateBack()"
          (goNext)="navigateNext()">
        </app-navigation-buttons>
      </div>

      <!-- Quality Details Modal -->
      <div class="modal-overlay" *ngIf="isModalOpen" (click)="closeModal()">
        <div class="modal-dialog" (click)="$event.stopPropagation()">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedQuality?.name }} - Details</h5>
              <button type="button" class="btn-close" (click)="closeModal()">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body" *ngIf="selectedQuality">
              <img [src]="selectedQuality.imageUrl" [alt]="selectedQuality.name" class="modal-image">
              <p class="quality-description">{{ selectedQuality.description }}</p>
              <h6>Ausstattungsmerkmale:</h6>
              <ul class="feature-list">
                <li *ngFor="let feature of selectedQuality.features">{{ feature }}</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-light" (click)="closeModal()">Schließen</button>
              <button type="button" class="btn btn-cta" (click)="selectAndClose(selectedQuality)" *ngIf="selectedQuality">
                {{ selectedQuality.name }} auswählen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .page-title {
      color: var(--text-light, #ffffff);
      margin-bottom: 10px;
      font-weight: 700;
    }

    .page-subtitle {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 30px;
      font-style: italic;
    }

    .quality-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .quality-card {
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.05);
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .quality-card:hover {
      border-color: var(--cta-color, #ef804e);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);
    }

    .quality-card.selected {
      border-color: var(--cta-color, #ef804e);
      background: rgba(239, 128, 78, 0.1);
      box-shadow: 0 15px 40px rgba(239, 128, 78, 0.3);
    }

    .quality-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 15px;
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 0.1);
    }

    .quality-content {
      flex: 1;
    }

    .quality-name {
      color: var(--text-light, #ffffff);
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 1.5rem;
    }

    .quality-description {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .btn-info {
      background: rgba(23, 162, 184, 0.2);
      color: #17a2b8;
      border: 1px solid #17a2b8;
      padding: 6px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
    }

    .btn-info:hover {
      background: #17a2b8;
      color: white;
    }

    .selection-indicator {
      position: absolute;
      top: 15px;
      right: 15px;
      color: var(--cta-color, #ef804e);
      font-size: 28px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-dialog {
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-content {
      background: var(--primary-color, #1b3244);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .modal-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      color: var(--text-light, #ffffff);
      margin: 0;
      font-weight: 600;
    }

    .btn-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 5px;
    }

    .btn-close:hover {
      color: var(--cta-color, #ef804e);
    }

    .modal-body {
      padding: 20px;
    }

    .modal-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 15px;
      margin-bottom: 20px;
    }

    .modal-body h6 {
      color: var(--text-light, #ffffff);
      margin: 20px 0 10px 0;
      font-weight: 600;
    }

    .feature-list {
      list-style: none;
      padding: 0;
    }

    .feature-list li {
      padding: 8px 0;
      color: rgba(255, 255, 255, 0.9);
      position: relative;
      padding-left: 25px;
    }

    .feature-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--accent-color, #9fce99);
      font-weight: bold;
    }

    .modal-footer {
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      gap: 15px;
      justify-content: flex-end;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 25px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline-light {
      background: transparent;
      color: var(--text-light, #ffffff);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-outline-light:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .btn-cta {
      background: var(--cta-color, #ef804e);
      color: white;
    }

    .btn-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(239, 128, 78, 0.4);
    }

    @media (max-width: 768px) {
      .quality-grid {
        grid-template-columns: 1fr;
      }
      
      .page-content {
        padding: 20px;
      }

      .modal-footer {
        flex-direction: column;
      }

      .modal-footer .btn {
        width: 100%;
      }
    }
  `]
})
export class PageTwoComponent implements OnInit, OnDestroy {
  bathroomData!: BathroomData;
  qualityLevels: QualityLevel[] = [];
  isModalOpen = false;
  selectedQuality: QualityLevel | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    private bathroomDataService: BathroomDataService,
    private NavigationBadrechnerService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
    this.qualityLevels = this.bathroomDataService.getQualityLevels();
    
    this.bathroomDataService.bathroomData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.bathroomData = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectQuality(quality: QualityLevel): void {
    this.bathroomDataService.updateQualityLevel(quality);
  }

  openQualityDetails(quality: QualityLevel): void {
    this.selectedQuality = quality;
    this.isModalOpen = true;
  }

  selectAndClose(quality: QualityLevel): void {
    this.selectQuality(quality);
    this.closeModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedQuality = null;
  }

  canProceed(): boolean {
    return this.bathroomData.qualityLevel !== null;
  }

  navigateBack(): void {
    this.NavigationBadrechnerService.navigateToPrevious();
  }

  navigateNext(): void {
    if (this.canProceed()) {
      this.NavigationBadrechnerService.navigateToNext();
    }
  }
}