import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true
})
export class ScrollSpyDirective implements OnInit {
  @Input() threshold = 0.1;
  @Output() inView = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.inView.emit(entry.isIntersecting);
        });
      },
      { threshold: this.threshold }
    );

    observer.observe(this.el.nativeElement);
  }
}