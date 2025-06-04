import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // Add HTTP interceptor logic here
  // For example: add auth headers, error handling, etc.
  
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq);
};