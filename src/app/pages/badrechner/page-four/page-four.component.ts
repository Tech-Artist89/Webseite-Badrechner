// src/app/components/badrechner/page-four/page-four.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BathroomDataService } from '../../../services/bathroom-data.service';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';
import { ProgressIndicatorComponent } from '../../../components/shared/progress-indicator/progress-indicator.component';
import { ImageCheckboxComponent } from '../../../components/shared/image-checkbox/image-checkbox.component';
import { NavigationButtonsComponent } from '../../../components/shared/navigation-buttons/navigation-buttons.component';
import { BathroomData, HeatingOption } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-page-four',
  standalone: true,
  imports: [
    CommonModule,
    ProgressIndicatorComponent,
    ImageCheckboxComponent,
    NavigationButtonsComponent
  ],
  template: `
    <div class="container mt-4">
      <app-progress-indicator [currentStep]="4" [totalSteps]="5"></app-progress-indicator>
      
      <div class="page-content">
        <h2 class="page-title">Welche Heizung benötigen Sie?</h2>
        <p class="page-subtitle">Mehrfachauswahl möglich</p>
        
        <div class="heating-grid">
          <app-image-checkbox
            *ngFor="let heating of heatingOptions"
            [selected]="isHeatingSelected(heating.id)"
            [imageUrl]="heating.imageUrl"
            [label]="heating.name"
            (selectionChange)="onHeatingSelectionChange(heating.id, $event)">
          </app-image-checkbox>
        </div>

        <div class="info-section">
          <div class="alert alert-info" role="alert">
            <h5 class="alert-heading">
              <i class="fas fa-thermometer-half"></i> Hinweise zur Heizungsauswahl
            </h5>
            <div class="row">
              <div class="col-md-6">
                <div class="info-card">
                  <h6><i class="fas fa-fire"></i> Heizkörper</h6>
                  <ul class="feature-list">
                    <li>Klassische und bewährte Heizlösung</li>
                    <li>Schnelle Wärmeabgabe</li>
                    <li>Kostengünstige Installation</li>
                    <li>Ideal für schnelle Aufheizung</li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="info-card">
                  <h6><i class="fas fa-th"></i> Fußbodenheizung</h6>
                  <ul class="feature-list">
                    <li>Gleichmäßige Wärmeverteilung</li>
                    <li>Erhöhter Komfort und Gemütlichkeit</li>
                    <li>Besonders bei Fliesen empfehlenswert</li>
                    <li>Energieeffizienter Betrieb</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="recommendation">
              <strong><i class="fas fa-lightbulb"></i> Empfehlung:</strong>
              Bei größeren Badezimmern (>8m²) empfehlen wir die Kombination aus Fußbodenheizung und einem zusätzlichen Heizkörper für optimalen Komfort.
            </div>
          </div>
        </div>

        <app-navigation-buttons
          [canGoBack]="true"
          [canGoNext]="true"
          [isLastPage]="false"
          (goBack)="navigateBack()"
          (goNext)="navigateNext()">
        </app-navigation-buttons>
      </div>
    </div>
  `,
 styleUrls: ['./page-four.component.scss']
})
export class PageFourComponent implements OnInit, OnDestroy {
  bathroomData!: BathroomData;
  heatingOptions: HeatingOption[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private bathroomDataService: BathroomDataService,
    private NavigationBadrechnerService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
    this.heatingOptions = this.bathroomDataService.getHeatingOptions();
    
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

  isHeatingSelected(heatingId: string): boolean {
    return this.bathroomData.heating.includes(heatingId);
  }

  onHeatingSelectionChange(heatingId: string, selected: boolean): void {
    let updatedHeating = [...this.bathroomData.heating];
    
    if (selected) {
      if (!updatedHeating.includes(heatingId)) {
        updatedHeating.push(heatingId);
      }
    } else {
      updatedHeating = updatedHeating.filter(id => id !== heatingId);
    }
    
    this.bathroomDataService.updateHeating(updatedHeating);
  }

  navigateBack(): void {
    this.NavigationBadrechnerService.navigateToPrevious();
  }

  navigateNext(): void {
    this.NavigationBadrechnerService.navigateToNext();
  }
}