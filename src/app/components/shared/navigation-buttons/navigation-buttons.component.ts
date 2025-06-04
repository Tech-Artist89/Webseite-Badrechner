// src/app/components/shared/navigation-buttons/navigation-buttons.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navigation-buttons">
      <button 
        type="button" 
        class="btn btn-outline-light" 
        [disabled]="!canGoBack"
        (click)="goBack.emit()"
        *ngIf="canGoBack">
        <i class="fas fa-arrow-left"></i> Zurück
      </button>
      
      <div class="spacer"></div>
      
      <button 
        type="button" 
        class="btn btn-cta" 
        [disabled]="!canGoNext"
        (click)="goNext.emit()"
        *ngIf="!isLastPage">
        Weiter <i class="fas fa-arrow-right"></i>
      </button>
      
      <button 
        type="button" 
        class="btn btn-accent" 
        [disabled]="!canSubmit"
        (click)="submit.emit()"
        *ngIf="isLastPage">
        <i class="fas fa-paper-plane"></i> Kostenlose Beratung anfordern
      </button>
    </div>
  `,
  styles: [`
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding: 20px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .spacer {
      flex: 1;
    }

    .btn {
      padding: 12px 24px;
      font-weight: 600;
      border-radius: 25px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-outline-light {
      background: transparent;
      color: var(--text-light, #ffffff);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-outline-light:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--accent-color, #9fce99);
      color: var(--accent-color, #9fce99);
    }

    .btn-cta {
      /* ✅ KORRIGIERT: Direkte Farben statt lighten() mit CSS-Variablen */
      background: linear-gradient(45deg, #ef804e, #f5965e);
      color: white;
    }

    .btn-cta:hover:not(:disabled) {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 30px rgba(239, 128, 78, 0.4);
    }

    .btn-accent {
      /* ✅ KORRIGIERT: Direkte Farben statt lighten() mit CSS-Variablen */
      background: linear-gradient(45deg, #9fce99, #b5d6b0);
      color: #1b3244;
      font-weight: 700;
    }

    .btn-accent:hover:not(:disabled) {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 30px rgba(159, 206, 153, 0.4);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn i {
      margin: 0;
    }

    @media (max-width: 768px) {
      .navigation-buttons {
        flex-direction: column;
        gap: 15px;
      }
      
      .spacer {
        display: none;
      }
      
      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class NavigationButtonsComponent {
  @Input() canGoBack: boolean = false;
  @Input() canGoNext: boolean = true;
  @Input() canSubmit: boolean = true;
  @Input() isLastPage: boolean = false;
  
  @Output() goBack = new EventEmitter<void>();
  @Output() goNext = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
}