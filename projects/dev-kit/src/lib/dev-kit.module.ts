import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { ApiService, ApiServiceConfig } from './api/api.service';
import { CommonModule } from '@angular/common';
import { ApiServiceInterceptor } from './api/api-service-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user/user.service';

// API
export * from './api/api-response';
export * from './api/api-request';
export * from './api/api.service';
export * from './user/user.service';


@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiServiceInterceptor, multi: true }
  ]
})
export class DevKitModule {
  constructor
  (@Optional() @SkipSelf() parentModule: DevKitModule) {
    if (parentModule) {
      throw new Error(
        'DevKitModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: ApiServiceConfig): ModuleWithProviders {
    return {
      ngModule: DevKitModule,
      providers: [
        {provide: ApiServiceConfig, useValue: config }
      ]
    };
  }
}
