import { NgModule } from '@angular/core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic';
import { SharedModule } from './shared/shared.module';
import { Store } from '@ngxs/store';
import { AddRoute,ABP } from '@abp/ng.core';
import { CodingManagementNgAlainRoutingModule } from './fs-coding-management-ng-alain-routing.module';
import { CodingManagementModule } from './coding-management/coding-management.module';

@NgModule({
  imports: [
    SharedModule,
    NgAlainBasicModule,
    CodingManagementNgAlainRoutingModule,
    CodingManagementModule
  ]
})
export class CodingManagementNgAlainModule {
}
