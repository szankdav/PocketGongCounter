import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../api/api.service';
import { Observable, isObservable, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { WritableSignal, signal } from '@angular/core';
import { Counter } from '../../../models/counter.model';

describe('CounterService', () => {
  let apiService: ApiService;
  let service: CounterService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    apiService = TestBed.inject(ApiService);
    service = TestBed.inject(CounterService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

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

  it('should be created', () => {
    const service: CounterService = TestBed.get(CounterService);
    expect(service).toBeTruthy();
  });

  it('should return Counter[] from COUNTER_RESPONSE', () => {
    service.getCounters$().subscribe({
      next: (res) => {
        expect(res.length).toBe(2);
        expect(res[0].counter_name).toBe("Mock1")
        expect(res[1].counter_name).toBe("Mock2")
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${service.countersForUserPath}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET")

    mockHttp.flush(COUNTER_RESPONSE)
  })

  it('should return with Counter when createCounter$ is called', () => {
    service.createCounter$(COUNTER_RESPONSE.items[0]).subscribe({
      next: (res) => {
        expect(res.counter_name).toBe("Mock1");
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${service.updateCreateDeleteCounterPath}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST")

    mockHttp.flush(COUNTER_RESPONSE.items[0])
  })

  it('should return with Counter when updateCounter$ is called', () => {
    service.updateCounter$(COUNTER_RESPONSE.items[0]).subscribe({
      next: (res) => {
        expect(res.counter_name).toBe("Mock1");
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${service.updateCreateDeleteCounterPath}${COUNTER_RESPONSE.items[0].id}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("PATCH")

    mockHttp.flush(COUNTER_RESPONSE.items[0])
  })

  it('should return with HttpResponse<Object> when deleteCounter$ is called', () => {
    service.deleteCounter$(COUNTER_RESPONSE.items[0].id).subscribe({
      next: (res) => {
        expect(res).toBeNull();
      }
    })
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${service.updateCreateDeleteCounterPath}${COUNTER_RESPONSE.items[0].id}`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("DELETE")

    mockHttp.flush(null)
  })

  it('should set Counters[] signal with the returned counters', () => {
    service.setCounters();
    const mockHttp = httpCtrl.expectOne(`${apiService.baseUrl}/${service.countersForUserPath}`);
    mockHttp.flush(COUNTER_RESPONSE)
    expect(service.counters()[0].counter_name).toBe("Mock1")
  })

  // it('should return with Observable<Counter> when createCounter$ is called', () => {
  //   const getCounters$Observable = service.getCounters$();
  //   expect(getCounters$Observable).toBeInstanceOf(Observable)
  // })
});