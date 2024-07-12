import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import PocketBase, { ClientResponseError } from 'pocketbase';
import { IBaasService } from './baas.service.interface';

@Injectable({
  providedIn: 'root',
})
export class BaasService implements IBaasService {
  pb = new PocketBase(environment.pocketbaseUrl);

  /**
   * Authenticates a user with an email and password.
   *
   * This function attempts to authenticate a user using their email and password.
   * If there is an authentication error (e.g. wrong password), it returns `false`.
   * For any other errors, it rethrows the error.
   *
   * @param {string} email - The email of the user to authenticate.
   * @param {string} password - The password of the user to authenticate.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if authentication
   *   is successful, or `false` if authentication fails with a 400 status error.
   * @throws {Error} - Throws a ServerError if an unexpected error occurs during authentication.
   */
  async authWithPassword(email: string, password: string): Promise<boolean> {
    try {
      await this.pb.collection('users').authWithPassword(email, password);
    } catch (error) {
      if (error instanceof ClientResponseError && error.status === 400)
        return false;
      throw error;
    }
    return true;
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
