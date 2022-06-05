import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.url.indexOf('rapidapi.com') !== -1) {
        let header = {
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
          'X-RapidAPI-Key': 'f48d6be83dmsh2dd9989acd644a9p149167jsn8cdac720a6aa'
        };

        request = request.clone({
            setHeaders: header
        });
      }
      return next.handle(request);
  }
}