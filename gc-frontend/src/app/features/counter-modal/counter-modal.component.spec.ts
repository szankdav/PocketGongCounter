import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterModuleComponent } from './counter-modal.component';

describe('CounterModuleComponent', () => {
  let component: CounterModuleComponent;
  let fixture: ComponentFixture<CounterModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
