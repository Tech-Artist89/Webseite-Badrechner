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
  styleUrls: ['./navigation-buttons.component.scss']

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