import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginModel, UserResponse } from '../models/login.model';

const TOKEN_KEY = 'batcave_token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly API_URL = 'http://localhost:5010/api';

  constructor(private http: HttpClient) {}

  // POST /api/User/login: if it works, we keep the token in the browser
  login(login: LoginModel): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.API_URL}/User/login`, login)
      .pipe(tap((response) => response.token && localStorage.setItem(TOKEN_KEY, response.token)));
  }

  // GET /api/User/me: protected endpoint, the interceptor adds the Bearer token
  getProfile(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.API_URL}/User/me`);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
