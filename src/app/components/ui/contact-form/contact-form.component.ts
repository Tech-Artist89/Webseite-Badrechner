import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  serviceOptions = [
    { value: 'heating', label: 'Heizungsbau' },
    { value: 'bathroom', label: 'Bäderbau' },
    { value: 'installation', label: 'Installation' },
    { value: 'emergency', label: 'Notdienst' },
    { value: 'consultation', label: 'Beratung' }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      urgent: [false]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      const formData: ContactForm = this.contactForm.value;
      
      console.log('🚀 Sending to backend:', formData);
      
      this.contactService.submitContact(formData).subscribe({
        next: (response) => {
          console.log('✅ Backend Response:', response);
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('❌ Backend Error:', error);
          this.isSubmitting = false;
          this.submitError = true;
          this.errorMessage = error.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
          
          setTimeout(() => {
            this.submitError = false;
          }, 8000);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} ist erforderlich`;
      if (field.errors['email']) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      if (field.errors['minlength']) return `${fieldName} ist zu kurz`;
    }
    return '';
  }
}