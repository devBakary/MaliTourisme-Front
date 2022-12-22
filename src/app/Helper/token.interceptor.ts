import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../_services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)

    const token = this.tokenService.getToken()

    //si le token est inserer dans le header
    if(token !== null){
      let clone = request.clone({
        headers : request.headers.set('Authorization', 'bearer' + token)
      })
      console.log(clone)
      return next.handle(clone)
    }

    return next.handle(request);
  }
}

export const TokenInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true },
];
