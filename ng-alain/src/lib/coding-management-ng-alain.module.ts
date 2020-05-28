import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { CodingManagementNgAlainRoutingModule } from './coding-management-ng-alain-routing.module';
import { CodingsModule } from './codings/codings.module';
import { CodingsState } from '@fs/theme.core';
import { NgxsModule } from '@ngxs/store';
@NgModule({
  imports: [
    SharedModule,
    CodingManagementNgAlainRoutingModule,
    CodingsModule,
    NgxsModule.forFeature([CodingsState]),
  ]
})
export class CodingManagementNgAlainModule {
}
