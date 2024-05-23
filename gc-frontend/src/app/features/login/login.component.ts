import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService)
  emailAddress = signal('')
  password = signal('')

  showLoginAltert = signal(false)

  async login() {
    try {
      await this.auth.login(this.emailAddress(), this.password())
      this.showLoginAltert.set(true)
    } catch (error) {
      console.error('Error during login: ' + error);
    }
  }
}
