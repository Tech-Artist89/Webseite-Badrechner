import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <div class="progress-header">
        <h6 class="progress-title">Schritt {{ currentStep }} von {{ totalSteps }}</h6>
        <span class="progress-percentage">{{ progressPercentage }}%</span>
      </div>
      <div class="progress">
        <div 
          class="progress-bar progress-bar-striped" 
          role="progressbar" 
          [style.width.%]="progressPercentage"
          [attr.aria-valuenow]="progressPercentage"
          aria-valuemin="0" 
          aria-valuemax="100">
        </div>
      </div>
      <div class="step-indicators">
        <div 
          *ngFor="let step of steps; let i = index"
          class="step-indicator"
          [class.completed]="i < currentStep - 1"
          [class.current]="i === currentStep - 1">
          <div class="step-circle">
            <i class="fas fa-check" *ngIf="i < currentStep - 1"></i>
            <span *ngIf="i >= currentStep - 1">{{ i + 1 }}</span>
          </div>
          <span class="step-label">{{ step }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./progress-indicator.component.scss']

})
export class ProgressIndicatorComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 5;
  @Input() steps: string[] = [
    'Ausstattung',
    'Qualität',
    'Fliesen',
    'Heizung',
    'Kontakt'
  ];

  get progressPercentage(): number {
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }
}