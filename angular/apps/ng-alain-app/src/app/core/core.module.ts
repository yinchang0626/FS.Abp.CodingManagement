import { NgModule } from '@angular/core';

import { NgAlainSharedModule } from '@fs/ng-alain/shared';

import { CoreModule as AbpCoreModule } from '@abp/ng.core';
import { environment } from '../../environments/environment';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AccountConfigModule } from '@abp/ng.account.config';
import { IdentityConfigModule } from '@fs/identity/config';
import { TenantManagementConfigModule } from '@fs/tenant-management/config';
import { SettingManagementConfigModule } from '@fs/setting-management/config';
import { LayoutDefaultComponent, LayoutPassportComponent, LayoutFullScreenComponent } from '@fs/ng-alain/basic';

import { CodingManagementConfigModule } from '@fs/coding-management/config';
import {CoreModule as FSCoreModule} from '@fs/core';




const LOGGERS = [NgxsLoggerPluginModule.forRoot({ disabled: false })];
const AlainLayouts = [LayoutDefaultComponent, LayoutPassportComponent, LayoutFullScreenComponent];
const AbpConfigModules=[
  FSCoreModule.forRoot({layouts:AlainLayouts}),
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
    AbpCoreModule.forRoot({
      environment
    }),
    ThemeSharedModule.forRoot(),
    ...AbpConfigModules,
    NgxsModule.forRoot([]),

    ...(environment.production ? [] : LOGGERS),

  
    //@fs/ng-alain
    NgAlainSharedModule,
    //modules
  ],
  exports: [

  ],
  providers: [
    // { provide: AbpConfirmationService, useClass: ConfirmationService },
    // { provide: AbpToasterService, useClass: ToasterService }
  ]

})
export class CoreModule { }
