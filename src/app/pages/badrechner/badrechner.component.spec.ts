import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadrechnerComponent } from './badrechner.component';

describe('BadrechnerComponent', () => {
  let component: BadrechnerComponent;
  let fixture: ComponentFixture<BadrechnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadrechnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadrechnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
