import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core';
import { ApiServiceConfig } from './api/api';
import { ApiServiceInterceptor } from './api/api-service-interceptor.service';
import { ApiService } from './api/api.service';
import { UserService, UserServiceConfig } from './user/user.service';

// API
export * from './api/api';
export * from './api/api.service';
export * from './user/user.service';

const defaultApiConfig = {
  id: 'id',
  url: 'url',
  headers: {
    authorization: 'Authorization',
    option: 'Option'
  },
  use: {
    method: 'method',
    url: 'url'
  },
};

export function apiConfigFactory(config) {
  return config;
}

export const API_CONFIG: InjectionToken<ApiServiceConfig> = new InjectionToken<ApiServiceConfig>('apiServiceConfig');
export const USER_CONFIG: InjectionToken<UserServiceConfig> = new InjectionToken<UserServiceConfig>('userServiceConfig');

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [
    ApiService,
    UserService,
  ]
})
export class DevKitModule {
  constructor(@Optional() @SkipSelf() parentModule: DevKitModule) {
    if (parentModule) {
      throw new Error(
        'DevKitModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(apiConfig: ApiServiceConfig = {}, userConfig: UserServiceConfig = {}): ModuleWithProviders<DevKitModule> {
    return {
      ngModule: DevKitModule,
      providers: [
        UserService,
        {
          provide: API_CONFIG,
          useValue: apiConfig,
        },
        {
          provide: ApiService,
          useFactory: provideApiService,
          deps: [API_CONFIG, HttpClient]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: provideApiServiceInterceptor,
          deps: [API_CONFIG, ApiService, UserService],
          multi: true
        },
        {
          provide: USER_CONFIG,
          useValue: userConfig,
        },
        {
          provide: UserServiceConfig,
          useValue: userConfig,
          deps: [USER_CONFIG]
        }
      ]
    };
  }
}

export function provideApiService(newConfig?: ApiServiceConfig, httpClient?: HttpClient): any {
  const config = { ...defaultApiConfig, ...newConfig };
  const service = new ApiService(config, httpClient);
  return service;
}

export function provideApiServiceInterceptor(newConfig?: ApiServiceConfig, apiService?: ApiService, userService?: UserService): any {
  const config = { ...defaultApiConfig, ...newConfig };
  const service = new ApiServiceInterceptor(apiService, userService, config);
  return service;
}

export function provideUserService(config?: UserServiceConfig): any {
  const service = new UserService(config);
  return service;
}
