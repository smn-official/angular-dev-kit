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
