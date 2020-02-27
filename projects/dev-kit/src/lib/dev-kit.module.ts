import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
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

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [
    ApiService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiServiceInterceptor,
      multi: true
    }
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

  static forRoot(apiConfig: ApiServiceConfig = {}, userConfig: UserServiceConfig = {}): ModuleWithProviders {
    return {
      ngModule: DevKitModule,
      providers: [
        ApiService,
        UserService,
        {
          provide: ApiServiceConfig,
          useValue: { ...defaultApiConfig, ...apiConfig }
        },
        {
          provide: UserServiceConfig,
          useValue: userConfig
        }
      ]
    };
  }
}
