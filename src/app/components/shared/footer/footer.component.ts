import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ContactInfo } from '../../../models/contact';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contactInfo!: ContactInfo;
  currentYear = new Date().getFullYear();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }
}