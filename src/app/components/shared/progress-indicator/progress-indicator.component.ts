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
  styles: [`
    .progress-container {
      margin-bottom: 30px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(27, 50, 68, 0.1);
      box-shadow: 0 2px 8px rgba(27, 50, 68, 0.1);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .progress-title {
      margin: 0;
      color: #1b3244;
      font-weight: 600;
    }

    .progress-percentage {
      font-weight: 700;
      color: #ef804e;
      font-size: 1.1rem;
    }

    .progress {
      height: 10px;
      margin-bottom: 20px;
      background-color: rgba(27, 50, 68, 0.1);
      border-radius: 5px;
      overflow: hidden;
    }

    .progress-bar {
      background: linear-gradient(90deg, #ef804e 0%, #d96a39 100%);
      transition: width 0.6s ease;
      border-radius: 5px;
    }

    .step-indicators {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }

    .step-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 120px;
    }

    .step-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: 8px;
      transition: all 0.3s ease;
      border: 2px solid rgba(27, 50, 68, 0.2);
      background: white;
      color: #666;
      font-size: 0.9rem;
    }

    .step-indicator.completed .step-circle {
      background: #9fce99;
      border-color: #9fce99;
      color: white;
    }

    .step-indicator.current .step-circle {
      background: #ef804e;
      border-color: #ef804e;
      color: white;
      box-shadow: 0 0 0 4px rgba(239, 128, 78, 0.2);
    }

    .step-label {
      font-size: 12px;
      text-align: center;
      color: #666;
      font-weight: 500;
    }

    .step-indicator.current .step-label {
      color: #ef804e;
      font-weight: 700;
    }

    .step-indicator.completed .step-label {
      color: #9fce99;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .step-indicators {
        justify-content: center;
        gap: 5px;
      }
      
      .step-indicator {
        min-width: 80px;
      }
      
      .step-circle {
        width: 32px;
        height: 32px;
        font-size: 0.8rem;
      }
      
      .step-label {
        font-size: 10px;
      }
    }
  `]
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