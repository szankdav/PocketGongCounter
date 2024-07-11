import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment.development';
import { IBaasService } from '../baas/baas.service.interface';
import { Router } from '@angular/router';
import { BaasService } from '../baas/baas.service';
environment;

let mockBaasService: jasmine.SpyObj<IBaasService>;
let mockRouter: jasmine.SpyObj<Router>;

describe('AuthService', () => {
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
          useValue: mockBaasService
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

  it('should call isAuthValid when login is called', async () => {
    await service.login('mock@mock.mock', 'mockIt');
    expect(mockBaasService.isAuthValid).toHaveBeenCalled();
  })

  // it('should call getAuthUser when isAuthValid is called and returned true', async () => {
  //   await service.login('mock@mock.mock', 'mockIt');
  //   expect(mockBaasService.authWithPassword).toHaveBeenCalled();
  //   expect(mockBaasService.isAuthValid).toHaveBeenCalled();
  //   expect(service.user().email).toBe('mock@mock.mock');
  // })

  // Nem tudom letesztelni a getAuthUser-t, mert a mock nem jut el odáig, hogy valid felhasználó legyen az authStoreban.
  // Itt megint magát a pocketbase-t kellene mockolni, de akkor felvetődik a kérdés, hogy jó-e így a kód?

  // Try catch eljut-e a navigate-ig ha nem sikerül az initUser?

  it('should call logoutUser when logout is called', () => {
    service.logout();
    expect(mockBaasService.logoutUser).toHaveBeenCalled();
  })

  it('should navigate to login page after logout is called', () => {
    service.logout();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login')
  })
});