import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthQuarantaineComponent } from './auth-quarantaine.component';

describe('AuthQuarantaineComponent', () => {
  let component: AuthQuarantaineComponent;
  let fixture: ComponentFixture<AuthQuarantaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthQuarantaineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthQuarantaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
