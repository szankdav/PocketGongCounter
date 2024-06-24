import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
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
    service.get<string>('/valami').subscribe({
      next: (res) => {
        expect(res).toBeTruthy();
      }
    })
  });

  it('should return COUNTER_RESPONSE from http get call', done => {
    service.get<CounterResponse>('counters').subscribe({
      next: (res) => {
        expect(res).toBeTruthy();
        expect(res.items.length).toBeGreaterThan(1);
        done();
      }
    })
    const mockHttp = httpCtrl.expectOne(`${service.baseUrl}/counters`);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET")

    mockHttp.flush(COUNTER_RESPONSE)
  })
});