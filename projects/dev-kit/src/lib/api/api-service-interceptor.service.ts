import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { ApiService } from './api.service';


const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
};

@Injectable()
export class ApiServiceInterceptor implements HttpInterceptor {

  constructor(private api: ApiService, private user: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Pegando token de autenticação.
    const authToken = this.user.getToken();
    // Pegando a opção da tela que o usuário está
    const option = this.api.getOption();

    const headers: any = { ...DEFAULT_HEADERS };

    if (authToken) {
      headers.Authorization = authToken;
    }
    if (option) {
      headers.Option = option;
    }

    const request = req.clone({ setHeaders: headers });

    return next.handle(request);
  }
}
