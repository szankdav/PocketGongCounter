import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import PocketBase from 'pocketbase';
import { User } from '../../../models/user.model';
import { IBaasService } from './baas.service.interface';

@Injectable({
  providedIn: 'root',
})
export class BaasService implements IBaasService {
  pb = new PocketBase(environment.pocketbaseUrl);

  async authWithPassword(email: string, password: string) {
    return await this.pb.collection('users').authWithPassword(email, password);
  }

  isAuthValid(): boolean {
    return this.pb.authStore.isValid;
  }

  getAuthUser(): { id: string; email: string } {
    return {
      id: this.pb.authStore.model ? this.pb.authStore.model['id'] : '',
      email: this.pb.authStore.model ? this.pb.authStore.model['email'] : '',
    };
  }

  logoutUser(): void {
    this.pb.authStore.clear();
  }
}
