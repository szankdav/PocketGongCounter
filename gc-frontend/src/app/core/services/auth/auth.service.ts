import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { BaasService } from '../baas/baas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baas = inject(BaasService)
  router = inject(Router)
  user: WritableSignal<User> = signal({
    id: '',
    email: ''
  })

  constructor() {
    this.initUser()
  }

  async login(email: string, password: string): Promise<boolean | null> {
    let res;
    try {
      res = await this.baas.authWithPassword(email, password)
    } catch (error) {
        console.error(error);
        return null;
    }
    this.initUser();
    return res;
  }

  initUser() {
    if (this.baas.isAuthValid()) {
      this.user.set(this.baas.getAuthUser());
    }
  }

  logout() {
    try {
      this.baas.logoutUser();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Logout falied: ', error)
    }
  }
}
