import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiServiceInterceptor } from './api/api-service-interceptor.service';
import { ApiServiceConfig } from './api/api.service';
import { UserServiceConfig } from './user/user.service';

// API
export * from './api/api-request';
export * from './api/api-response';
export * from './api/api.service';
export * from './user/user.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiServiceInterceptor, multi: true }
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

  static forRoot(apiConfig: ApiServiceConfig, userConfig: UserServiceConfig): ModuleWithProviders {
    return {
      ngModule: DevKitModule,
      providers: [
        { provide: ApiServiceConfig, useValue: apiConfig },
        { provide: UserServiceConfig, useValue: userConfig }
      ]
    };
  }
}
