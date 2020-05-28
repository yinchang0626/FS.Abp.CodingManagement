import { noop } from '@abp/ng.core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CodingManagementConfigService } from './services/coding-management-config.service';
import { InitConfigService } from '@fs/theme.core';

@NgModule({  
  providers: [{ provide: APP_INITIALIZER, deps: [CodingManagementConfigService], useFactory: InitConfigService, multi: true }],
})
export class CodingManagementConfigModule {}
