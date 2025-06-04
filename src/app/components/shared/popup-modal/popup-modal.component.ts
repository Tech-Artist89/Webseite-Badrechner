import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentOption } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-popup-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal fade show" tabindex="-1" style="display: block;" *ngIf="isOpen">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="close()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6" *ngFor="let option of options">
                <div class="option-card" [class.selected]="option.selected" 
                     (click)="selectOption(option)">
                  <img [src]="option.imageUrl" [alt]="option.name" class="option-image"
                       (error)="onImageError($event)">
                  <h6 class="option-title">{{ option.name }}</h6>
                  <p class="option-description">{{ option.description }}</p>
                  <div class="selection-indicator" *ngIf="option.selected">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close()">
              <i class="fas fa-times"></i> Schließen
            </button>
            <button type="button" class="btn btn-primary" (click)="confirm()" 
                    [disabled]="!hasSelection()">
              <i class="fas fa-check"></i> Auswählen
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="isOpen" (click)="close()"></div>
  `,
  styles: [`
    .modal {
      z-index: 1055;
    }

    .modal-backdrop {
      z-index: 1050;
      background-color: rgba(27, 50, 68, 0.7);
    }

    .modal-content {
      border: none;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(27, 50, 68, 0.3);
    }

    .modal-header {
      background: linear-gradient(135deg, #1b3244 0%, #0f1a24 100%);
      color: white;
      border-radius: 15px 15px 0 0;
      padding: 20px 25px;
      border-bottom: none;
    }

    .modal-title {
      font-weight: 700;
      font-size: 1.25rem;
      margin: 0;
    }

    .btn-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      opacity: 0.8;
      transition: all 0.3s ease;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .btn-close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }

    .modal-body {
      padding: 25px;
    }

    .option-card {
      border: 2px solid rgba(27, 50, 68, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      background: white;
      box-shadow: 0 2px 8px rgba(27, 50, 68, 0.1);
    }

    .option-card:hover {
      border-color: #ef804e;
      box-shadow: 0 4px 16px rgba(239, 128, 78, 0.2);
      transform: translateY(-2px);
    }

    .option-card.selected {
      border-color: #ef804e;
      background-color: #fff8f4;
      box-shadow: 0 4px 20px rgba(239, 128, 78, 0.3);
    }

    .option-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 15px;
      background: #f8f9fa;
      border: 1px solid rgba(27, 50, 68, 0.1);
    }

    .option-title {
      font-weight: 600;
      color: #1b3244;
      margin-bottom: 8px;
      font-size: 1.1rem;
    }

    .option-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 0;
      line-height: 1.5;
    }

    .selection-indicator {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #ef804e;
      font-size: 28px;
      background: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(239, 128, 78, 0.3);
    }

    .modal-footer {
      padding: 20px 25px;
      border-top: 1px solid rgba(27, 50, 68, 0.1);
      background: #f8f9fa;
      border-radius: 0 0 15px 15px;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-secondary {
      background: #6c757d;
      border-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
      border-color: #545b62;
      transform: translateY(-1px);
    }

    .btn-primary {
      background: linear-gradient(135deg, #ef804e 0%, #d96a39 100%);
      border-color: #ef804e;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #d96a39 0%, #c55a2e 100%);
      border-color: #d96a39;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 128, 78, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    @media (max-width: 768px) {
      .modal-dialog {
        margin: 10px;
      }
      
      .option-image {
        height: 120px;
      }
      
      .modal-header, .modal-body, .modal-footer {
        padding: 15px 20px;
      }
    }
  `]
})
export class PopupModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() options: EquipmentOption[] = [];
  @Output() optionSelected = new EventEmitter<EquipmentOption>();
  @Output() modalClosed = new EventEmitter<void>();

  selectOption(option: EquipmentOption): void {
    // Clear all selections first
    this.options.forEach(opt => opt.selected = false);
    // Select the clicked option
    option.selected = true;
  }

  hasSelection(): boolean {
    return this.options.some(option => option.selected);
  }

  confirm(): void {
    const selectedOption = this.options.find(option => option.selected);
    if (selectedOption) {
      this.optionSelected.emit(selectedOption);
    }
    this.close();
  }

  close(): void {
    this.modalClosed.emit();
  }

  onImageError(event: any): void {
    // Fallback image wenn das originale Bild nicht geladen werden kann
    event.target.src = 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150">
        <rect width="200" height="150" fill="#f8f9fa"/>
        <text x="100" y="75" font-family="Arial" font-size="14" fill="#6c757d" text-anchor="middle" dominant-baseline="middle">
          Bild nicht verfügbar
        </text>
      </svg>
    `);
  }
}