import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BathroomDataService } from '../../../services/bathroom-data.service';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';
import { ProgressIndicatorComponent } from '../../../components/shared/progress-indicator/progress-indicator.component';
import { ImageCheckboxComponent } from '../../../components/shared/image-checkbox/image-checkbox.component';
import { PopupModalComponent } from '../../../components/shared/popup-modal/popup-modal.component';
import { RangeSliderComponent } from '../../../components/shared/range-slider/range-slider.component';
import { NavigationButtonsComponent } from '../../../components/shared/navigation-buttons/navigation-buttons.component';
import { BathroomData, EquipmentItem, EquipmentOption } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-page-one',
  standalone: true,
  imports: [
    CommonModule,
    ProgressIndicatorComponent,
    ImageCheckboxComponent,
    PopupModalComponent,
    RangeSliderComponent,
    NavigationButtonsComponent
  ],
  template: `
    <div class="container mt-4">
      <app-progress-indicator [currentStep]="1" [totalSteps]="5"></app-progress-indicator>
      
      <div class="page-content">
        <h2 class="page-title">Welche Ausstattung benötigen Sie?</h2>
        <p class="page-subtitle">Mehrfachauswahl möglich</p>
        
        <div class="equipment-grid">
          <app-image-checkbox
            *ngFor="let equipment of bathroomData.equipment"
            [selected]="equipment.selected"
            [imageUrl]="equipment.iconUrl"
            [label]="equipment.name"
            [hasPopup]="true"
            (selectionChange)="onEquipmentSelectionChange(equipment.id, $event)"
            (openPopup)="openEquipmentPopup(equipment)">
          </app-image-checkbox>
        </div>

        <div class="bathroom-size-section">
          <h3>Wie groß ist Ihr Badezimmer?</h3>
          <app-range-slider
            label="Badezimmergröße"
            [min]="2"
            [max]="20"
            [step]="0.5"
            unit=" m²"
            [value]="bathroomData.bathroomSize"
            (valueChange)="onBathroomSizeChange($event)">
          </app-range-slider>
        </div>

        <app-navigation-buttons
          [canGoBack]="false"
          [canGoNext]="true"
          [isLastPage]="false"
          (goNext)="navigateNext()">
        </app-navigation-buttons>
      </div>

      <!-- Equipment Popup Modal -->
      <app-popup-modal
        [isOpen]="isModalOpen"
        [title]="modalTitle"
        [options]="modalOptions"
        (optionSelected)="onEquipmentOptionSelected($event)"
        (modalClosed)="closeModal()">
      </app-popup-modal>
    </div>
  `,
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit, OnDestroy {
  bathroomData!: BathroomData;
  isModalOpen = false;
  modalTitle = '';
  modalOptions: EquipmentOption[] = [];
  currentEquipmentId = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private bathroomDataService: BathroomDataService,
    private navigationService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
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

  onEquipmentSelectionChange(equipmentId: string, selected: boolean): void {
    this.bathroomDataService.updateEquipmentSelection(equipmentId, selected);
  }

  onBathroomSizeChange(size: number): void {
    this.bathroomDataService.updateBathroomSize(size);
  }

  openEquipmentPopup(equipment: EquipmentItem): void {
    this.currentEquipmentId = equipment.id;
    this.modalTitle = `${equipment.name} - Optionen wählen`;
    this.modalOptions = [...equipment.popupDetails.options];
    this.isModalOpen = true;
  }

  onEquipmentOptionSelected(option: EquipmentOption): void {
    this.bathroomDataService.updateEquipmentOption(this.currentEquipmentId, option.id, true);
    this.bathroomDataService.updateEquipmentSelection(this.currentEquipmentId, true);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentEquipmentId = '';
    this.modalOptions = [];
  }

  navigateNext(): void {
    this.navigationService.navigateToNext();
  }
}