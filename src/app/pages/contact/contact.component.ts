import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../../components/ui/contact-form/contact-form.component';
import { DataService } from '../../services/data.service';
import { ContactInfo } from '../../models/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactInfo!: ContactInfo;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }

  getOpeningHoursArray(): { day: string, hours: string }[] {
    if (!this.contactInfo) return [];
    
    const days = [
      { key: 'monday', label: 'Montag' },
      { key: 'tuesday', label: 'Dienstag' },
      { key: 'wednesday', label: 'Mittwoch' },
      { key: 'thursday', label: 'Donnerstag' },
      { key: 'friday', label: 'Freitag' },
      { key: 'saturday', label: 'Samstag' },
      { key: 'sunday', label: 'Sonntag' }
    ];

    return days.map(day => ({
      day: day.label,
      hours: this.contactInfo.openingHours[day.key as keyof typeof this.contactInfo.openingHours]
    }));
  }
}