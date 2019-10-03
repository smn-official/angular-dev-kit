import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

import { UserService } from '../user/user.service';
import { ApiService, ApiServiceConfig } from './api.service';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
};

@Injectable()
export class ApiServiceInterceptor implements HttpInterceptor {
  private authorization: ApiServiceConfig['headers']['authorization'];
  private option: ApiServiceConfig['headers']['option'];

  constructor(private api: ApiService, private user: UserService, @Optional() apiConfig: ApiServiceConfig) {
    this.authorization = apiConfig.headers.authorization;
    this.option = apiConfig.headers.option;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Pegando token de autenticação.
    const authToken = this.user.getToken();

    // Pegando a opção da tela que o usuário está
    const option = this.api.getOption();

    console.log(option)

    const headers: any = { ...DEFAULT_HEADERS };

    if (authToken && !req.headers.get(this.authorization)) {
      headers[this.authorization] = authToken;
    }

    if (option && !req.headers.get(this.option)) {
      headers[this.option] = option;
    }

    const request = req.clone({ setHeaders: headers });

    return next.handle(request);
  }
}
