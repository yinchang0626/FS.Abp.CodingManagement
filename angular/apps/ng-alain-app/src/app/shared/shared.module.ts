import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { TableModule } from 'primeng/table';
import { NgAlainBasicModule } from '@fs/ng-alain/basic';

@NgModule({
  declarations: [],
  imports: [
    NgAlainBasicModule,
  ],
  exports: [
    NgAlainBasicModule,
  ],
  providers: [],
})
export class SharedModule { }
