import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true
})
export class AnimateOnScrollDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('fade-in-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(this.el.nativeElement);
    this.el.nativeElement.classList.add('fade-in');
  }
}