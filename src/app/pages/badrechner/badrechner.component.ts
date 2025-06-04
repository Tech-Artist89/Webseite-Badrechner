import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badrechner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>badrechner works!</p>
  `,
  styleUrls: ['./badrechner.component.scss']
})
export class BadrechnerComponent {
  // Diese Component wird aktuell nicht verwendet
  // Der Badrechner läuft über BathroomConfiguratorComponent
}