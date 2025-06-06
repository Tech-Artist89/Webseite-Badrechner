import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-checkbox-container" [class.selected]="selected" (click)="toggle()">
      <div class="image-wrapper">
        <img [src]="imageUrl" [alt]="label" class="checkbox-image" 
             (error)="onImageError($event)">
        <div class="checkbox-overlay">
          <div class="checkbox-icon">
            <i class="fas fa-check-lg" *ngIf="selected"></i>
          </div>
        </div>
      </div>
      <div class="checkbox-label">{{ label }}</div>
      <button *ngIf="hasPopup" type="button" class="btn btn-info btn-sm popup-btn" 
              (click)="$event.stopPropagation(); openPopup.emit()">
        <i class="fas fa-info-circle"></i> Details
      </button>
    </div>
  `,
  styleUrls: ['./image-checkbox.component.scss']
})
export class ImageCheckboxComponent {
  @Input() selected: boolean = false;
  @Input() imageUrl: string = '';
  @Input() label: string = '';
  @Input() hasPopup: boolean = false;
  @Output() selectionChange = new EventEmitter<boolean>();
  @Output() openPopup = new EventEmitter<void>();

  toggle(): void {
    this.selected = !this.selected;
    this.selectionChange.emit(this.selected);
  }

  onImageError(event: any): void {
    // Fallback image wenn das originale Bild nicht geladen werden kann
    event.target.src = 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">
        <rect width="200" height="120" fill="#f8f9fa"/>
        <text x="100" y="60" font-family="Arial" font-size="14" fill="#6c757d" text-anchor="middle" dominant-baseline="middle">
          Bild nicht verfügbar
        </text>
      </svg>
    `);
  }
}