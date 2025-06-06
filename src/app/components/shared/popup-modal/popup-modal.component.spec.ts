import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModalComponent } from './popup-modal.component';

describe('PopupModalComponent', () => {
  let component: PopupModalComponent;
  let fixture: ComponentFixture<PopupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
