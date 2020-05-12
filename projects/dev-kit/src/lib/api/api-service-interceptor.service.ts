import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { UiSnackbar } from 'ng-smn-ui';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ApiServiceConfig } from './api';
import { ApiService } from './api.service';

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
  private customConfigError: ApiServiceConfig['configError'];

  constructor(private api: ApiService, private user: UserService, apiConfig: ApiServiceConfig) {
    this.authorization = apiConfig.headers.authorization;
    this.option = apiConfig.headers.option;
    this.customConfigError = apiConfig.configError;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Pegando token de autenticação.
    const authToken = this.user.getToken();

    // Pegando a opção da tela que o usuário está
    const option = this.api.getOption();

    const headers: any = { ...DEFAULT_HEADERS };

    if (authToken && !req.headers.get(this.authorization)) {
      headers[this.authorization] = authToken;
    }

    if (option && !req.headers.get(this.option)) {
      headers[this.option] = option;
    }

    // Pegando as configurações de erros
    const configError: any = req.params.get('configError');
    // Deletando o parâmetro config para que não seja colocado em nenhuma query string ou body
    const params = req.params.delete('configError');

    const request = req.clone({ setHeaders: headers, params });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (configError && configError.pure) {
          return;
        }

        let snackMessages = {
          0: 'Um de nossos serviços está fora do ar e não foi possível processar sua requisição. Tente novamente mais tarde.',
          400: 'Requisição inválida. Verifique as informações fornecidas.',
          500: 'Ocorreu um erro interno. Já fomos informados do erro. Tente novamente mais tarde.',
          ...this.customConfigError.snackMessages
        };

        if (configError) {
          snackMessages = { ...snackMessages, ...configError.snackMessages };
        }

        if (this.customConfigError && this.customConfigError.callback) {
          this.customConfigError.callback(error);
        }

        for (const code in snackMessages) {
          if (error.status === +code) {
            UiSnackbar.show({
              text: snackMessages[code],
              duration: 10000,
              actionText: 'Ok',
              action: close => close()
            });
          }
        }

        return throwError(error);
      })
    );
  }
}
