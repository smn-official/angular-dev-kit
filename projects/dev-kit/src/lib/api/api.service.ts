import { Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/internal/operators';
import { ApiServiceRequest, ApiServiceRequestOptions } from './api-request';
import { ApiResponse } from './api-response';

let OPTIONS = [];
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: 'Sat, 01 Jan 2000 00:00:00 GMT'
};

export class ApiServiceConfig {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  id: string;
  name: string;

  constructor(@Optional() config: ApiServiceConfig, private httpClient: HttpClient) {
    this.id = config ? config.id : 'id';
    this.name = config ? config.name : 'name';
  }

  /**
   * Atribui o valor dos métodos
   * @param options - Opções do menu
   *
   */
  set options(options) {
    OPTIONS = options;
  }

  /**
   * Retorna os métodos
   */
  get options() {
    return OPTIONS;
  }

  get(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.get(paramsFormatted.url, {
      params: leftover,
      ...options
    });
  }

  post(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.post(paramsFormatted.url, {
      body: leftover,
      ...options
    });
  }

  put(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.put(paramsFormatted.url, {
      body: leftover,
      ...options
    });
  }

  delete(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.delete(paramsFormatted.url, {
      params: leftover,
      ...options
    });
  }


  /**
   * Configura um requisição HTTP
   * @deprecated
   * @param method - Tipo da requisição
   * @param url - Url da API que será chamada
   * @param options - Opções adicionais para requisição
   * Os parâmetros tipos reais dos parâmetros podem ser encontrados no arquivo irmão(api-request.ts)
   * @return function
   */
  http(method: ApiServiceRequest['method'], url: ApiServiceRequest['url'], options: ApiServiceRequestOptions = {}) {
    // const userToken = UserService.getToken();
    const userToken = '';
    if (userToken) {
      const authorization: any = {
        Authorization: userToken
      };

      if (OPTIONS && OPTIONS.length) {
        const option = this.getOption();

        if (option) {
          authorization.Option = option;
        }
      }

      options.headers = { ...authorization, ...options.headers };

      if (!options.headers.Authorization) {
        delete options.headers.Authorization;
      }
    }

    return {
      call: this.request(method, url, options)
    };
  }

  /**
   * Efetua a requisição em uma API
   * @deprecated
   * @param method - Tipo da requisição
   * @param url - Url da API que será chamada
   * @param options - Opções adicionais para requisição
   */
  request(method: ApiServiceRequest['method'], url: ApiServiceRequest['url'], options: ApiServiceRequestOptions = {}) {
    return (data?: {}) => {
      if (data) {
        const paramsFormatted = this.formatParams(url, data);
        url = paramsFormatted.url;

        if (method === 'GET' || method === 'DELETE') {
          options.params = paramsFormatted.leftover;
        } else {
          options.body = paramsFormatted.leftover;
        }
      }

      const params = new HttpParams({
        fromObject: options.params
      });

      const headers = { ...DEFAULT_HEADERS, ...options.headers };
      const httpOptions = {
        headers: this.generateHeaders(headers),
        params,
        body: options.body,
        withCredentials: options.withCredentials || false
      };

      const httpRequest = new HttpRequest(
        method,
        url,
        httpOptions.body,
        httpOptions
      );

      const request: any = httpRequest;
      request.subscribe = (next?, error?, complete?) => {
        return this.httpClient
          .request(httpRequest)
          .pipe(
            map(res => ApiResponse.extractData(res, next, options.cleanResult)),
            catchError(res =>
              ApiResponse.handleError(res, error, options.cleanError)
            ),
            finalize(complete)
          )
          .subscribe();
      };

      return request;
    };
  }

  /**
   * Retorna o Cod_Opc da funcionalidade a ser chamada
   */
  getOption(): number | null {
    const option = this.getFullOption();
    return option.Cod_Opc || null;
  }

  /**
   * Retorna a opção da funcionalidade a ser chamada
   */
  getFullOption() {
    let option;

    const base: any = document.querySelector('base').getAttribute('href');
    // Removendo todos itens que não tem url
    const options = OPTIONS.filter(item => {
      const url = item.Nom_URLAngular;
      return url
        ? url.replace('/', '')
        : url === location.pathname.replace(base, '');
    });

    // Buscando o Cod_Opc
    options.map(item => {
      const urlAngular = item.Nom_URLAngular.substring(1);

      if (this.isOption(urlAngular)) {
        option = item;
      }
    });

    return option || {};
  }

  isOption(url) {
    const base: any = document.querySelector('base').getAttribute('href');
    const path = location.pathname.replace(base, '');

    if (path.indexOf(url) === -1) {
      return false;
    }

    const pathSplited = path.split('/');
    const urlSplited = url.split('/');

    for (let i = 0; i < urlSplited.length; i++) {
      if (pathSplited[i] !== urlSplited[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Constroi os Headers de uma requisição
   * @param headers - Headers a serem incluidos na requisição
   */
  generateHeaders(headers) {
    let newHeaders = new HttpHeaders();
    Object.keys(headers).map(key => {
      newHeaders = newHeaders.set(key, headers[key]);
    });

    return newHeaders;
  }

  /**
   * Insere os parâmetros na url e retornando a url final e o restante dos valores
   * @param url - Url a ser formatada
   * @param params - Parâmetros, Query Strings e Body da requisição
   */
  formatParams(url, params) {
    if (Array.isArray(params)) {
      return {
        url,
        leftover: params
      };
    }

    const data = Object.assign({}, params);

    url = url.split('/');
    Object.keys(data).forEach(key => {
      if (typeof data[key] !== 'number' && !data[key]) {
        delete data[key];
      } else {
        const indexOf = url.indexOf(`:${key}`);
        if (indexOf !== -1) {
          url[indexOf] = data[key];
          delete data[key];
        }
      }
    });

    return {
      url: url.join('/'),
      leftover: data
    };
  }
}
