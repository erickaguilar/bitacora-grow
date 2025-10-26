
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '@data/services/store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storeService: StoreService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storeService.token;

    // We only want to add the token for requests to our own API, not to external URLs.
    // This check can be made more robust if needed.
    if (token && request.url.startsWith('/api')) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
