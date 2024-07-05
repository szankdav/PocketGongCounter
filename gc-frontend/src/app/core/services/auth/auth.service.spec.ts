import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment.development';
import PocketBase, {
  BaseAuthStore,
  RecordModel,
  RecordService,
} from 'pocketbase';
import { BaasService } from '../baas/baas.service';
import { IBaasService } from '../baas/baas.service.interface';
import { Router } from '@angular/router';

environment;

let mockBaasService: jasmine.SpyObj<IBaasService>;
let mockRouter: jasmine.SpyObj<Router>;

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    mockBaasService = jasmine.createSpyObj<IBaasService>('BaasService', [
      'authWithPassword',
      'getAuthUser',
      'isAuthValid',
      'logoutUser'
    ]);

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl'])

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BaasService,
          useValue: mockBaasService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        }
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call authWithPassword when login is called', async () => {
    await service.login('mock@mock.mock', 'mockIt');
    expect(mockBaasService.authWithPassword).toHaveBeenCalled();
  });

  it('should navigate to home after login', async () => {
    await service.login('mock@mock.mock', 'mockIt');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
  })
});
