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
  styles: [`
    .page-content {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .page-title {
      color: var(--text-light, #ffffff);
      margin-bottom: 30px;
      font-weight: 700;
      text-align: center;
    }

    .tiles-section {
      margin-bottom: 40px;
    }

    .section-title {
      color: var(--cta-color, #ef804e);
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 1.5rem;
      border-bottom: 2px solid rgba(239, 128, 78, 0.3);
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-title i {
      font-size: 1.25rem;
    }

    .tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .info-section {
      margin-bottom: 30px;
    }

    .alert {
      background: rgba(23, 162, 184, 0.1);
      border: 1px solid rgba(23, 162, 184, 0.3);
      border-radius: 15px;
      padding: 20px;
      color: var(--text-light, #ffffff);
    }

    .alert-heading {
      color: #17a2b8;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .info-list {
      list-style: none;
      padding: 0;
      margin-bottom: 0;
    }

    .info-list li {
      padding: 5px 0;
      color: rgba(255, 255, 255, 0.9);
      position: relative;
      padding-left: 20px;
    }

    .info-list li:before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--accent-color, #9fce99);
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .tiles-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
      }
      
      .page-content {
        padding: 20px;
      }

      .section-title {
        font-size: 1.25rem;
      }
    }
  `]
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