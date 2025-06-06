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
styleUrls: ['./page-two.component.scss']
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