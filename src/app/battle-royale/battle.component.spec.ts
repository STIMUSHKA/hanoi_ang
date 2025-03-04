import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';

describe('EngineComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BattleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
