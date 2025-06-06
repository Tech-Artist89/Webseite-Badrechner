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
  styles: [`
    .image-checkbox-container {
      position: relative;
      cursor: pointer;
      border: 2px solid rgba(27, 50, 68, 0.2);
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 8px rgba(27, 50, 68, 0.1);
    }

    .image-checkbox-container:hover {
      border-color: #ef804e;
      box-shadow: 0 4px 16px rgba(239, 128, 78, 0.2);
      transform: translateY(-2px);
    }

    .image-checkbox-container.selected {
      border-color: #ef804e;
      background-color: #fff8f4;
      box-shadow: 0 4px 20px rgba(239, 128, 78, 0.3);
    }

    .image-wrapper {
      position: relative;
      margin-bottom: 12px;
    }

    .checkbox-image {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid rgba(27, 50, 68, 0.1);
    }

    .checkbox-overlay {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      background: white;
      border: 2px solid rgba(27, 50, 68, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .selected .checkbox-overlay {
      background: #ef804e;
      border-color: #ef804e;
      color: white;
    }

    .checkbox-icon {
      font-size: 16px;
      font-weight: bold;
    }

    .checkbox-label {
      font-weight: 600;
      color: #1b3244;
      margin-bottom: 10px;
      font-size: 14px;
    }

    .popup-btn {
      font-size: 12px;
      padding: 6px 12px;
      background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
      border: none;
      border-radius: 20px;
      color: white;
      transition: all 0.3s ease;
    }

    .popup-btn:hover {
      background: linear-gradient(135deg, #138496 0%, #0f6674 100%);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);
    }

    @media (max-width: 768px) {
      .checkbox-image {
        height: 100px;
      }
      
      .checkbox-label {
        font-size: 13px;
      }
      
      .checkbox-overlay {
        width: 28px;
        height: 28px;
        top: 6px;
        right: 6px;
      }
      
      .checkbox-icon {
        font-size: 14px;
      }
    }
  `]
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