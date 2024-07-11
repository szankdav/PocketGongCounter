import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { ClientResponseError } from 'pocketbase';
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

  async login(email: string, password: string) {
    try {
      await this.baas.authWithPassword(email, password)
      this.initUser();
      this.router.navigateByUrl('/home');
    } catch (error) {
      if (!(error instanceof ClientResponseError)) {
        console.error(error);
        return;
      }
      if (error.status == 400) {
        console.log(error.status, error.message);
      }
    }
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
