import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


fdescribe('ApiService with jasmine mock', () => {
  let service: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient> ;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      providers:
      [
        {
          provide: HttpClient, 
          useValue: httpSpy
        }]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http client with the given route when the get method has been called', () => {
    service.get<string>('/valami')
    expect(httpSpy.get.calls.count()).toBe(1)
  });

  it('should call http client with proper base route', () => {
    service.get<string>('test')
    expect(httpSpy.get.calls.first().args[0]).toBe('http://localhost:8090/api/collections/test')
  })
});
