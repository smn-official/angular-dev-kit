/**
 * Interface de parâmetros de uma requisção HTTP
 */
export interface ApiServiceRequest {
    method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'POST' | 'PUT';
    url: string;
    options: ApiServiceRequestOptions;
}

/**
 * Interface de configurações para uma requisição HTTP
 */
export interface ApiServiceRequestOptions {
    headers?: any;
    reportProgress?: boolean;
    params?: any;
    body?: any;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | any;
    cleanResult?: boolean;
    cleanError?: boolean;
    configError?: any;
    withCredentials?: boolean;
}

export interface ApiServiceConfigHeader {
  authorization?: string;
  option?: string;
}

export interface ApiServiceConfigUse {
  method?: string;
  url?: string;
}

export interface ApiServiceConfigError {
  pure?: boolean;
  callback?: () => void;
  snackMessages?: any;
}

export class ApiServiceConfig {
  id?: string;
  url?: string;
  use?: ApiServiceConfigUse;
  headers?: ApiServiceConfigHeader;
  configError?: any;
}
