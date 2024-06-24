import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent, HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('increaseCounter should increase counter_value by 1', done => {
    let counter = {
      id: '',
      counter_value: 0,
      user_id: '',
      counter_name: ''
    }
    component.increaseCounter(counter)
    expect(counter.counter_value).toBe(1)
    done();
  })

  it('decreaseCounter should decrease counter_value by 1', done => {
    let counter = {
      id: '',
      counter_value: 0,
      user_id: '',
      counter_name: ''
    }
    component.decreaseCounter(counter)
    expect(counter.counter_value).toBe(-1)
    done();
  })

  it('increaseCounter should call updateCounter function with the counter parameter', done => {
    let counter = {
      id: '',
      counter_value: 0,
      user_id: '',
      counter_name: ''
    }
    const updateSpy = spyOn(component, 'updateCounter')
    component.increaseCounter(counter);
    expect(updateSpy).toHaveBeenCalled();
    done();
  })
});
