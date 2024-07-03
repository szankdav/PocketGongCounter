import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../api/api.service';
import { environment } from '../../../../environments/environment.development';
environment;

fdescribe('AuthService', () => {
  let service: AuthService;
  let apiService: ApiService;
  let httpCtrl: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  const AUTHSTORE_RESPONSE = {
    "baseToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJ2aTJ5aDZ5aGFrZTFvcGgiLCJleHAiOjE3MjEwNTczMTQsImlkIjoiMDZvb2Jub2dkajljZzYxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.4XlS4jRImUxznp6VX4e2-cAt6_Dkc9p-XwEyEdHAADA",
    "baseModel": {
      "collectionId": "mockCollectionID",
      "collectionName": "mockCollection",
      "created": "2024-05-15 07:44:53.362Z",
      "email": "mock@mock.mock",
      "emailVisibility": false,
      "id": "mockUserID",
      "updated": "2024-05-15 07:44:53.362Z",
      "username": "mockUser",
      "verified": false
    },
    "_onChangeCallbacks": [],
    "storageFallback": {},
    "storageKey": "mock_auth"
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call authWithPassword when login is called', async () => {
    const mockHttp = httpCtrl.expectOne(`${environment.baseUrl}/users/auth-with-password`);
    const httpRequest = mockHttp.request;
    expect(httpRequest.method).toEqual("POST");
    await service.login("mock@mock.mock", "mockIt")
    mockHttp.flush(AUTHSTORE_RESPONSE)
    expect(service.user().id).toBe("mockUserID")
    expect(service.user().email).toBe("mock@mock.mock")
  })
});
