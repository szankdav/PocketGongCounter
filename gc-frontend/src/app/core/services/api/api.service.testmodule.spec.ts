import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


fdescribe('ApiService with test module', () => {
  let service: ApiService;
  let httpClient: HttpClient; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // mock
      // providers:[{provide: HttpClient, useClass: HttpMock}]
      // providers:
      // [
      //   {
      //     provide: HttpClient, 
      //     useValue: httpSpy
      //   }]
    });
    // httpClient = TestBed.inject(HttpClient);
    // httpclient az apibol jott, hianyzott
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client with the given route when the get method has been called', () => {
    service.get<string>('/valami')
    // const httpMock = service.http as unknown as HttpMock;
    // expect(httpMock.getcounter).toBe(1)
   
  });
});
