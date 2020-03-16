import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { CodingManagementNgAlainRoutingModule } from './coding-management-ng-alain-routing.module';
import { CodingsModule } from './codings/codings.module';

@NgModule({
  imports: [
    SharedModule,
    CodingManagementNgAlainRoutingModule,
    CodingsModule
  ]
})
export class CodingManagementNgAlainModule {
}
