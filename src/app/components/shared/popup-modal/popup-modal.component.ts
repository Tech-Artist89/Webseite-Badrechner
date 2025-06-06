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
  styleUrls: ['./popup-modal.component.scss']

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