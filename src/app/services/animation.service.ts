import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  observeFadeIn(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => observer.observe(element));
  }

  smoothScrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  animateCounter(element: HTMLElement, targetValue: number, duration: number = 2000): void {
    let startValue = 0;
    const increment = targetValue / (duration / 16);
    
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        startValue = targetValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(startValue).toString();
    }, 16);
  }
}