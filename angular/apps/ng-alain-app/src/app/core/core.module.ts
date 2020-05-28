import { NgModule } from '@angular/core';

import { NgAlainModule } from '@fs/ng-alain';
import { CoreModule as AbpCoreModule } from '@abp/ng.core';
import { environment } from '../../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AccountConfigModule } from '@abp/ng.account.config';
import { IdentityConfigModule } from '@fs/identity/config';
import { TenantManagementConfigModule } from '@fs/tenant-management/config';
import { SettingManagementConfigModule } from '@fs/setting-management/config';
import { LayoutDefaultComponent, LayoutPassportComponent, LayoutFullScreenComponent } from '@fs/ng-alain/basic';

import { CodingManagementConfigModule } from '@fs/coding-management/config';




const LOGGERS = [NgxsLoggerPluginModule.forRoot({ disabled: false })];
const AbpConfigModules=[
  AbpCoreModule.forRoot({
    environment
  }),

  AccountConfigModule.forRoot({ redirectUrl: '/' }),
  IdentityConfigModule,
  TenantManagementConfigModule,
  SettingManagementConfigModule,
  CodingManagementConfigModule
]


@NgModule({
  declarations: [
  ],
  imports: [    
    ...AbpConfigModules,
    NgxsModule.forRoot([]),
    NgAlainModule.forRoot(),
    ...(environment.production ? [] : LOGGERS),
  ],
  exports: [

  ],
  providers: [
    // { provide: AbpConfirmationService, useClass: ConfirmationService },
    // { provide: AbpToasterService, useClass: ToasterService }
  ]

})
export class CoreModule { }
