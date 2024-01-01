import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarantaineComponent } from './quarantaine.component';

describe('QuarantaineComponent', () => {
  let component: QuarantaineComponent;
  let fixture: ComponentFixture<QuarantaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarantaineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuarantaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
