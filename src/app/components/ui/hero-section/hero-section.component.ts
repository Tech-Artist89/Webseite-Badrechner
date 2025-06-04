import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimationService } from '../../../services/animation.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.animationService.observeFadeIn();
  }

  scrollToServices(): void {
    this.animationService.smoothScrollTo('services');
  }
}