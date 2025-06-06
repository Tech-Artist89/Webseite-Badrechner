// src/app/components/shared/navigation/navigation.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMenuOpen = false;
  activeDropdown: string | null = null;

  toggleMenu(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled:', this.isMenuOpen); // Debug log
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.activeDropdown = null;
  }

  toggleDropdown(dropdownName: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    // Auf Mobile: schließe andere Dropdowns
    if (window.innerWidth < 992) { // lg breakpoint
      if (this.activeDropdown === dropdownName) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdownName;
      }
    } else {
      // Desktop Verhalten bleibt gleich
      if (this.activeDropdown === dropdownName) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdownName;
      }
    }
  }

  closeDropdown(): void {
    // Nur Dropdown schließen, nicht das gesamte Mobile Menu
    this.activeDropdown = null;
  }

  isDropdownOpen(dropdownName: string): boolean {
    return this.activeDropdown === dropdownName;
  }

  // Neue Methode für Click Outside auf Mobile
  onClickOutside(): void {
    // Nur auf Desktop das Menu schließen
    if (window.innerWidth >= 992) {
      this.closeDropdown();
    }
  }
}