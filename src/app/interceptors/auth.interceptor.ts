import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

// Runs before every request: if there is a token, it adds "Authorization: Bearer <token>"
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(UserService).getToken();

  if (!token) {
    return next(request);
  }

  return next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
