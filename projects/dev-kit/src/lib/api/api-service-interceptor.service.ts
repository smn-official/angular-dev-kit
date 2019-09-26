import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { ApiService } from './api.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ApiServiceInterceptor implements HttpInterceptor {

  constructor(private api: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Pegando token de autenticação.
    const authToken = UserService.getToken();
    // Pegando a opção da tela que o usuário está
    const option = this.api.getOption();

    const headers: any = {};

    if (authToken) {
      headers.Authorization = authToken;
    }
    if (option) {
      headers.Option = option;
    }

    headers.Authorization = 'yes, he can';
    const request = req.clone({ setHeaders: headers });

    return next.handle(request);
  }
}
