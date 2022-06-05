import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { UtilsService } from '../utils.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService) {}
  private cache: Map<string, HttpResponse<any>> = new Map();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    const country = req.params?.get('country');
    const cachedResponse: any = this.cache.get(
      req.url + (country ? `/${country}` : '')
    );
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      this.utilsService.setIsLoading(true);
      return next.handle(req).pipe(
        tap((stateEvent) => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(
              req.url + (country ? `/${country}` : ''),
              stateEvent.clone()
            );
            this.utilsService.setIsLoading(false);
          }
        }),
        shareReplay(1)
      );
    }
  }
}
