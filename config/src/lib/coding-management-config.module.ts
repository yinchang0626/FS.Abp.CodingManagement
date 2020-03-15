import { noop } from '@abp/ng.core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CodingManagementConfigService } from './services/coding-management-config.service';

@NgModule({
  providers: [{ provide: APP_INITIALIZER, deps: [CodingManagementConfigService], useFactory: noop, multi: true }],
})
export class CodingManagementConfigModule {}
