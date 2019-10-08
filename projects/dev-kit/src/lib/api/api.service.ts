import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { ApiServiceRequest, ApiServiceRequestOptions } from './api-request';

let OPTIONS = [];
let METHODS = {};

export interface ApiServiceConfigHeader {
  authorization?: string;
  option?: string;
}

export interface ApiServiceConfigUse {
  method?: string;
  url?: string;
}

export class ApiServiceConfig {
  id?: string;
  url?: string;
  use?: ApiServiceConfigUse;
  headers?: ApiServiceConfigHeader;
  configError?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  id: string;
  url: string;
  useConfig: ApiServiceConfigUse;
  headers: ApiServiceConfigHeader;

  constructor(@Optional() config: ApiServiceConfig, private httpClient: HttpClient) {
    this.id = config.id;
    this.url = config.url;
    this.useConfig = config.use;
    this.headers = config.headers;
  }

  /**
   * Atribui o valor dos métodos
   * @param options - Opções do menu
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

  set methods(methods) {
    METHODS = methods;
  }

  get methods() {
    return METHODS;
  }
  /**
   * Configura um requisição HTTP do tipo GET
   * @param url - Url da API que será chamada
   * @param data - Parâmetros e query strings
   * @param options - Opções adicionais para requisição
   */
  get(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    const params = {
      ...leftover,
      configError: options.configError || null
    };

    return this.httpClient.get(paramsFormatted.url, {
      params,
      ...options
    });
  }

  /**
   * Configura um requisição HTTP do tipo POST
   * @param url - Url da API que será chamada
   * @param data - Parâmetros e o body da request
   * @param options - Opções adicionais para requisição
   */
  post(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.post(paramsFormatted.url, {
      body: leftover,
      ...options
    });
  }

  /**
   * Configura um requisição HTTP do tipo PUT
   * @param url - Url da API que será chamada
   * @param data - Parâmetros e o body da request
   * @param options - Opções adicionais para requisição
   */
  put(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.put(paramsFormatted.url, {
      body: leftover,
      ...options
    });
  }

  /**
   * Configura um requisição HTTP do tipo DELETE
   * @param url - Url da API que será chamada
   * @param data - Parâmetros da request
   * @param options - Opções adicionais para requisição
   */
  delete(url: ApiServiceRequest['url'], data: any = {}, options: ApiServiceRequestOptions = {}) {
    const { leftover, ...paramsFormatted } = this.formatParams(url, data);

    return this.httpClient.delete(paramsFormatted.url, {
      params: leftover,
      ...options
    });
  }

  /**
   * Configura um requisição HTTP através da api, funcionalidade e método
   * @param api - Nome da API
   * @param funcionality - Nome da funcionalidade
   * @param api - Nome da method
   * @param data - Parâmetros query string e/ou body da request
   * @param options - Opções adicionais para requisição
   */
  use(api: string, funcionality: string, method: string, data: any = {}, options: ApiServiceRequestOptions = {}) {
    if (!METHODS[api][funcionality][method]) {
      console.error('Method not found');
      return;
    }

    const request = METHODS[api][funcionality][method];
    const selfMethod = request[this.useConfig.method].toLowerCase();

    return this[selfMethod](request[this.useConfig.url], data, options);
  }

  /**
   * Retorna o id da funcionalidade a ser chamada
   */
  getOption(): number | null {
    const option = this.getFullOption();
    const optionId = option[this.id];
    return optionId ? optionId.toString() : null;
  }

  /**
   * Retorna a opção da funcionalidade a ser chamada
   */
  getFullOption() {
    let option;

    const base: any = document.querySelector('base').getAttribute('href');
    // Removendo todos itens que não tem url
    const options = OPTIONS.filter(item => {
      const url = item[this.url];
      return url
        ? url.replace('/', '')
        : url === location.pathname.replace(base, '');
    });

    // Buscando o id
    options.map(item => {
      const url = item[this.url].substring(1);

      if (this.isOption(url)) {
        option = item;
      }
    });

    return option || {};
  }

  /**
   * Verifica se a url é uma opção
   * @param url - Url da API que será chamada
   */
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
