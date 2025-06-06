// src/app/components/badrechner/page-five/page-five.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BathroomDataService } from '../../../services/bathroom-data.service';
import { NavigationBadrechnerService } from '../../../services/navigation-badrechner.service';
import { EmailService } from '../../../services/email.service';
import { ProgressIndicatorComponent } from '../../../components/shared/progress-indicator/progress-indicator.component';
import { NavigationButtonsComponent } from '../../../components/shared/navigation-buttons/navigation-buttons.component';
import { BathroomData } from '../../../interfaces/badrechner';

@Component({
  selector: 'app-page-five',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressIndicatorComponent,
    NavigationButtonsComponent
  ],
  template: `
    <div class="container mt-4">
      <app-progress-indicator [currentStep]="5" [totalSteps]="5"></app-progress-indicator>
      
      <div class="page-content">
        <h2 class="page-title">Kostenlose Beratung anfordern</h2>
        <p class="page-subtitle">Wir erstellen Ihnen gerne ein individuelles Angebot</p>
        
        <!-- Additional Info Section -->
        <div class="section">
          <h3 class="section-title">
            <i class="fas fa-info-circle"></i>
            Zu welchen Themen wünschen Sie sich weitere Informationen?
          </h3>
          <div class="checkbox-group">
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="info-projektablauf" 
                [(ngModel)]="additionalInfo.projektablauf">
              <label class="form-check-label" for="info-projektablauf">
                <i class="fas fa-tasks"></i>
                Projektablauf
              </label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="info-garantie" 
                [(ngModel)]="additionalInfo.garantie">
              <label class="form-check-label" for="info-garantie">
                <i class="fas fa-shield-alt"></i>
                Garantie & Gewährleistung
              </label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="info-referenzen" 
                [(ngModel)]="additionalInfo.referenzen">
              <label class="form-check-label" for="info-referenzen">
                <i class="fas fa-star"></i>
                Referenzen
              </label>
            </div>
            <div class="form-check">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="info-foerderung" 
                [(ngModel)]="additionalInfo.foerderung">
              <label class="form-check-label" for="info-foerderung">
                <i class="fas fa-euro-sign"></i>
                Förderungsmöglichkeiten
              </label>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="section">
          <h3 class="section-title">
            <i class="fas fa-comment"></i>
            Haben Sie noch Anmerkungen?
          </h3>
          <div class="form-group">
            <textarea 
              class="form-control" 
              id="comments" 
              rows="4" 
              placeholder="Teilen Sie uns Ihre besonderen Wünsche, Zeitvorstellungen oder Anmerkungen mit..."
              [(ngModel)]="comments">
            </textarea>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="section">
          <h3 class="section-title">
            <i class="fas fa-address-card"></i>
            Kontaktdaten
          </h3>
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="salutation" class="form-label">Anrede *</label>
                  <select 
                    class="form-select" 
                    id="salutation" 
                    formControlName="salutation">
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                  </select>
                  <div *ngIf="contactForm.get('salutation')?.invalid && contactForm.get('salutation')?.touched" 
                       class="invalid-feedback d-block">
                    Bitte wählen Sie eine Anrede aus.
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="firstName" class="form-label">Vorname *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    formControlName="firstName"
                    placeholder="Ihr Vorname"
                    [class.is-invalid]="contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched">
                  <div *ngIf="contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched" 
                       class="invalid-feedback">
                    Bitte geben Sie Ihren Vornamen ein.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="lastName" class="form-label">Nachname *</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    formControlName="lastName"
                    placeholder="Ihr Nachname"
                    [class.is-invalid]="contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched">
                  <div *ngIf="contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched" 
                       class="invalid-feedback">
                    Bitte geben Sie Ihren Nachnamen ein.
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="phone" class="form-label">Telefon *</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="phone" 
                    formControlName="phone" 
                    placeholder="z.B. 030 123456789"
                    [class.is-invalid]="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched">
                  <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" 
                       class="invalid-feedback">
                    Bitte geben Sie eine gültige Telefonnummer ein.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-3">
                  <label for="email" class="form-label">E-Mail *</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    formControlName="email" 
                    placeholder="ihre.email@beispiel.de"
                    [class.is-invalid]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                  <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" 
                       class="invalid-feedback">
                    <span *ngIf="contactForm.get('email')?.errors?.['required']">Bitte geben Sie Ihre E-Mail-Adresse ein.</span>
                    <span *ngIf="contactForm.get('email')?.errors?.['email']">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Privacy Section -->
        <div class="section">
          <div class="alert alert-info" role="alert">
            <h6 class="alert-heading">
              <i class="fas fa-shield-alt"></i> Datenschutz & Service
            </h6>
            <div class="row">
              <div class="col-md-6">
                <p class="mb-2"><strong>Ihre Daten sind sicher:</strong></p>
                <ul class="privacy-list">
                  <li>Vertrauliche Behandlung</li>
                  <li>Keine Weitergabe an Dritte</li>
                  <li>DSGVO-konform</li>
                </ul>
              </div>
              <div class="col-md-6">
                <p class="mb-2"><strong>Unser Service für Sie:</strong></p>
                <ul class="privacy-list">
                  <li>Kostenlose Beratung</li>
                  <li>Unverbindliches Angebot</li>
                  <li>Schnelle Rückmeldung</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div class="loading-section" *ngIf="isLoading">
          <div class="alert alert-primary text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 mb-0">{{ loadingMessage }}</p>
          </div>
        </div>

        <!-- Success Message -->
        <div class="success-section" *ngIf="submitSuccess">
          <div class="alert alert-success text-center">
            <i class="fas fa-check-circle fa-3x mb-3"></i>
            <h4>Vielen Dank für Ihre Anfrage!</h4>
            <p>Wir haben Ihre Badkonfiguration erhalten und melden uns schnellstmöglich bei Ihnen zurück.</p>
            <button class="btn btn-outline-primary" (click)="resetForm()">
              Neue Konfiguration erstellen
            </button>
          </div>
        </div>

        <!-- Navigation Section -->
        <app-navigation-buttons
          [canGoBack]="true"
          [canGoNext]="false"
          [canSubmit]="contactForm.valid && !isLoading"
          [isLastPage]="true"
          (goBack)="navigateBack()"
          (submit)="onSubmit()">
        </app-navigation-buttons>
      </div>
    </div>
  `,
  styleUrls: ['./page-five.component.scss']
})
export class PageFiveComponent implements OnInit, OnDestroy {
  bathroomData!: BathroomData;
  contactForm!: FormGroup;
  comments: string = '';
  isLoading: boolean = false;
  loadingMessage: string = '';
  submitSuccess: boolean = false;
  
  additionalInfo = {
    projektablauf: false,
    garantie: false,
    referenzen: false,
    foerderung: false
  };
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private bathroomDataService: BathroomDataService,
    private NavigationBadrechnerService: NavigationBadrechnerService,
    private emailService: EmailService
  ) {
    this.initForm();
  }

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

  private initForm(): void {
    this.contactForm = this.fb.group({
      salutation: ['Herr', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }

    this.isLoading = true;
    this.loadingMessage = 'Ihre Anfrage wird versendet...';

    try {
      const formData = {
        contactData: this.contactForm.value,
        comments: this.comments,
        additionalInfo: this.additionalInfo,
        bathroomData: this.bathroomData
      };

      // Update Service mit den Daten
      this.bathroomDataService.updateContactData(this.contactForm.value);
      this.bathroomDataService.updateComments(this.comments);

      // E-Mail senden
      const result = await this.emailService.sendBathroomConfiguration(formData);
      
      if (result.success) {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.comments = '';
        this.additionalInfo = {
          projektablauf: false,
          garantie: false,
          referenzen: false,
          foerderung: false
        };
      } else {
        alert(`Fehler: ${result.message}`);
      }

    } catch (error) {
      console.error('Fehler beim Senden:', error);
      alert('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      this.isLoading = false;
      this.loadingMessage = '';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForm(): void {
    this.submitSuccess = false;
    this.bathroomDataService.resetData();
    this.NavigationBadrechnerService.navigateToPage(1);
  }

  navigateBack(): void {
    this.NavigationBadrechnerService.navigateToPrevious();
  }
}