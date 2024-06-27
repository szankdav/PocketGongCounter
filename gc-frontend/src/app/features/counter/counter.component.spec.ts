import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../../core/services/api/api.service';
import { CounterService } from '../../core/services/counter/counter.service';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let httpCtrl: HttpTestingController;
  let apiService: ApiService;
  let counterService: CounterService;

  const COUNTER_RESPONSE = {
    items: [
      {
        "collectionId": "coll_ID",
        "collectionName": "counters",
        "counter_name": "Mock1",
        "counter_value": 1,
        "created": "2024-06-10 10:07:18.216Z",
        "id": "counter_ID",
        "updated": "2024-06-24 11:45:21.414Z",
        "user_id": "user_ID"
      },
      {
        "collectionId": "coll_ID",
        "collectionName": "counters",
        "counter_name": "Mock2",
        "counter_value": 50,
        "created": "2024-06-10 10:07:24.015Z",
        "id": "counter_ID",
        "updated": "2024-06-24 11:45:32.619Z",
        "user_id": "user_ID"
      }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent, HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpCtrl = TestBed.inject(HttpTestingController);
    counterService = TestBed.inject(CounterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase counter_value by 1 when increaseCounter is called', done => {
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

  it('should decrease counter_value by 1 when decreaseCounter is called', done => {
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

  it('should call updateCounter function with the counter parameter when increaseCounter is called', done => {
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

  it('should call deleteCounter$ when deleteCounter is called', done => {
    let called = 0;
    counterService.deleteCounter$(COUNTER_RESPONSE.items[0].id).subscribe({
      next: (res) => {
        called++;
        done();
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${counterService.updateCreateDeleteCounterPath}${COUNTER_RESPONSE.items[0].id}`);
    component.deleteCounter(COUNTER_RESPONSE.items[0]);
    mockHttp.flush(null)
    expect(called).toEqual(1);
  })

  it('should call updateCounter$ when updateCounter is called', done => {
    let called = 0;
    counterService.updateCounter$(COUNTER_RESPONSE.items[0]).subscribe({
      next: (res) => {
        called++;
        done();
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${counterService.updateCreateDeleteCounterPath}${COUNTER_RESPONSE.items[0].id}`);
    component.deleteCounter(COUNTER_RESPONSE.items[0]);
    mockHttp.flush(null)
    expect(called).toEqual(1);
  })

  it('should set modalCounter signal with the incoming counter', () => {
    component.loadCounterToModal(COUNTER_RESPONSE.items[0]);
    expect(component.modalCounter().counter_name).toBe("Mock1");
  })
});
