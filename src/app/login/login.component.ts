import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoginModel, UserResponse } from '../models/login.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  // Signals: the screen updates by itself when they change
  errorMessage = signal('');
  token = signal('');
  profile = signal<UserResponse | null>(null);
  loading = signal(false);
  showPassword = signal(false);

  constructor(private userService: UserService) {}

  // If a saved token exists, ask the API who we are (this also proves the token is valid)
  ngOnInit() {
    if (!this.userService.getToken()) {
      return;
    }

    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.token.set(this.userService.getToken() ?? '');
      },
      error: () => this.userService.logout(), // expired or invalid token
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.loading.set(true);

    const loginModel = this.loginForm.value as LoginModel;

    this.userService.login(loginModel).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.profile.set(response);
        this.token.set(response.token ?? '');
      },
      error: (error) => {
        // 400 = wrong credentials (the API sends the message in Spanish), otherwise no connection
        this.loading.set(false);
        this.errorMessage.set(
          error.status === 400 && typeof error.error === 'string'
            ? error.error
            : 'No se pudo conectar con el servidor. Verificá que esté encendido.',
        );
      },
    });
  }

  logout() {
    this.userService.logout();
    this.profile.set(null);
    this.token.set('');
    this.loginForm.reset();
  }
}
