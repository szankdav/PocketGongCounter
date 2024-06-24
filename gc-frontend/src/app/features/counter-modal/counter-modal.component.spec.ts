import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterModalComponent } from './counter-modal.component';

describe('CounterModuleComponent', () => {
  let component: CounterModalComponent;
  let fixture: ComponentFixture<CounterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
