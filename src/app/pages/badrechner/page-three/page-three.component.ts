// src/app/components/badrechner/page-three/page-three.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { BathroomDataService } from '../../../services/bathroom-data.service';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';
import { ProgressIndicatorComponent } from '../../../components/shared/progress-indicator/progress-indicator.component';
import { ImageCheckboxComponent } from '../../../components/shared/image-checkbox/image-checkbox.component';
import { NavigationButtonsComponent } from '../../../components/shared/navigation-buttons/navigation-buttons.component';
import { BathroomData, TileOption } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-page-three',
  standalone: true,
  imports: [
    CommonModule,
    ProgressIndicatorComponent,
    ImageCheckboxComponent,
    NavigationButtonsComponent
  ],
  template: `
    <div class="container mt-4">
      <app-progress-indicator [currentStep]="3" [totalSteps]="5"></app-progress-indicator>
      
      <div class="page-content">
        <h2 class="page-title">Welche Fliesen benötigen Sie?</h2>
        
        <div class="tiles-section">
          <h3 class="section-title">
            <i class="fas fa-layer-group"></i>
            Bodenfliesen
          </h3>
          <div class="tiles-grid">
            <app-image-checkbox
              *ngFor="let tile of floorTiles"
              [selected]="isFloorTileSelected(tile.id)"
              [imageUrl]="tile.imageUrl"
              [label]="tile.name"
              (selectionChange)="onFloorTileSelectionChange(tile.id, $event)">
            </app-image-checkbox>
          </div>
        </div>

        <div class="tiles-section">
          <h3 class="section-title">
            <i class="fas fa-th-large"></i>
            Wandfliesen
          </h3>
          <div class="tiles-grid">
            <app-image-checkbox
              *ngFor="let tile of wallTiles"
              [selected]="isWallTileSelected(tile.id)"
              [imageUrl]="tile.imageUrl"
              [label]="tile.name"
              (selectionChange)="onWallTileSelectionChange(tile.id, $event)">
            </app-image-checkbox>
          </div>
        </div>

        <div class="info-section">
          <div class="alert alert-info" role="alert">
            <h5 class="alert-heading">
              <i class="fas fa-info-circle"></i> Hinweise zur Fliesenauswahl
            </h5>
            <div class="row">
              <div class="col-md-6">
                <p class="mb-2"><strong>Bodenfliesen:</strong></p>
                <ul class="info-list">
                  <li>Normale Fliesen: Bewährt und kostengünstig</li>
                  <li>Große Fliesen: Moderne Optik, weniger Fugen</li>
                  <li>Mosaik: Hochwertig und rutschfest</li>
                </ul>
              </div>
              <div class="col-md-6">
                <p class="mb-2"><strong>Wandfliesen:</strong></p>
                <ul class="info-list">
                  <li>Normale Fliesen: Klassisch und vielseitig</li>
                  <li>Große Fliesen: Eleganter Look</li>
                  <li>Mosaik: Designakzent für besondere Bereiche</li>
                </ul>
              </div>
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
 styleUrls: ['./page-three.component.scss']
})
export class PageThreeComponent implements OnInit, OnDestroy {
  bathroomData!: BathroomData;
  floorTiles: TileOption[] = [];
  wallTiles: TileOption[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private bathroomDataService: BathroomDataService,
    private NavigationBadrechnerService: NavigationBadrechnerService
  ) {}

  ngOnInit(): void {
    const tileOptions = this.bathroomDataService.getTileOptions();
    this.floorTiles = tileOptions.floor;
    this.wallTiles = tileOptions.wall;
    
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

  isFloorTileSelected(tileId: string): boolean {
    return this.bathroomData.floorTiles.includes(tileId);
  }

  isWallTileSelected(tileId: string): boolean {
    return this.bathroomData.wallTiles.includes(tileId);
  }

  onFloorTileSelectionChange(tileId: string, selected: boolean): void {
    let updatedTiles = [...this.bathroomData.floorTiles];
    
    if (selected) {
      if (!updatedTiles.includes(tileId)) {
        updatedTiles.push(tileId);
      }
    } else {
      updatedTiles = updatedTiles.filter(id => id !== tileId);
    }
    
    this.bathroomDataService.updateFloorTiles(updatedTiles);
  }

  onWallTileSelectionChange(tileId: string, selected: boolean): void {
    let updatedTiles = [...this.bathroomData.wallTiles];
    
    if (selected) {
      if (!updatedTiles.includes(tileId)) {
        updatedTiles.push(tileId);
      }
    } else {
      updatedTiles = updatedTiles.filter(id => id !== tileId);
    }
    
    this.bathroomDataService.updateWallTiles(updatedTiles);
  }

  navigateBack(): void {
    this.NavigationBadrechnerService.navigateToPrevious();
  }

  navigateNext(): void {
    this.NavigationBadrechnerService.navigateToNext();
  }
}