import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CounterResponse } from '../../../models/counterResponse.model';

describe('ApiService with test module', () => {
  let service: ApiService;
  let httpCtrl: HttpTestingController;

  const COUNTER_RESPONSE = {
    items: [
      {
        "collectionId": "coll_ID",
        "collectionName": "counters",
        "counter_name": "Mock Name",
        "counter_value": 1,
        "created": "2024-06-10 10:07:18.216Z",
        "id": "counter_ID",
        "updated": "2024-06-24 11:45:21.414Z",
        "user_id": "user_ID"
      },
      {
        "collectionId": "coll_ID",
        "collectionName": "counters",
        "counter_name": "Mock Name",
        "counter_value": 50,
        "created": "2024-06-10 10:07:24.015Z",
        "id": "counter_ID",
        "updated": "2024-06-24 11:45:32.619Z",
        "user_id": "user_ID"
      }
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client with the given route when the get method has been called', () => {
    service.get<string>('getMock').subscribe()
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/getMock`);
    const httpRequest = mockHttp.request;
    expect(httpRequest.url).toEqual(`${service.baseUrl}/getMock`)
  });

  it('should return COUNTER_RESPONSE from http get call', () => {
    service.get<CounterResponse>('counters').subscribe({
      next: (res) => {
        expect(res).toBeTruthy();
        expect(res.items.length).toBeGreaterThan(1);
        expect(res.items.length).toBeLessThan(3);
        
      }
    })
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/counters`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET")

    mockHttp.flush(COUNTER_RESPONSE)
  })

  it('should call http client with the given route when the update method has benn called', () => {
    service.update<string>('updateMock', COUNTER_RESPONSE.items[0]).subscribe();
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/updateMock`);
    const httpRequest = mockHttp.request;
    expect(httpRequest.url).toEqual(`${service.baseUrl}/updateMock`)
  })

  it('should call http client with the given route when the create method has benn called', () => {
    service.create<string>('createMock', COUNTER_RESPONSE.items[0]).subscribe();
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/createMock`);
    const httpRequest = mockHttp.request;
    expect(httpRequest.url).toEqual(`${service.baseUrl}/createMock`)
  })

  it('should call http client with the given route when the delete method has benn called', () => {
    service.delete<string>('deleteMock', COUNTER_RESPONSE.items[0].id).subscribe();
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/deleteMock${COUNTER_RESPONSE.items[0].id}`);
    const httpRequest = mockHttp.request;
    expect(httpRequest.url).toEqual(`${service.baseUrl}/deleteMock${COUNTER_RESPONSE.items[0].id}`)
  })
});