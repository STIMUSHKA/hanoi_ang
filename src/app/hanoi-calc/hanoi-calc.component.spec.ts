import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HanoiCalcComponent } from './hanoi-calc.component';

describe('HanoiCalcComponent', () => {
  let component: HanoiCalcComponent;
  let fixture: ComponentFixture<HanoiCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HanoiCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HanoiCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
