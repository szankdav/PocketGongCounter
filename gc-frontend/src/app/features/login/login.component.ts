import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  emailAddress = signal('');
  password = signal('');

  showLoginAltert = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { nonNullable: true }),
  });

  get emailControl(): FormControl<string> {
    return this.loginForm.controls.email;
  }
  get passwordControl(): FormControl<string> {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((value) => {
      console.log('loginform value', value.);
      console.log('loginform valid', this.loginForm.valid);
      console.log('loginform errors', this.loginForm);
    });
  }

  async onSubmit() {
    console.log('loginForm value', this.loginForm.value);
    console.log('loginForm status', this.loginForm.valid);
    const isLoggedIn = await this.auth.login(
      this.emailControl.value,
      this.passwordControl.value
    );

    if (isLoggedIn === false) {
      this.loginForm.setErrors({
        invalidCredentials: true,
      });
    } else if (isLoggedIn === true) {
      this.router.navigateByUrl('/home');
    } else {
      alert('Server error')
    }

    //   if (isLoggedIn === true){
    //     this.router.navigateByUrl('/home');
    //   } else if (isLoggedIn === false) {
    //     this.showLoginAltert.set(true)
    //   } else {
    //     console.error('Server error')
    //   }
  }
}
