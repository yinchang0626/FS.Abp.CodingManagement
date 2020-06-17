import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic'
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CodingsRoutingModule } from './codings-routing.module';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { DetailComponent } from './detail/detail.component';
import { EditCodeComponent } from './modal/edit-code.component';
import { SettingManagementNgAlainModule } from '@fs/setting-management/ng-alain';
import { ThemeCoreState } from '@fs/theme.core';
import { CodingsState } from './providers';

@NgModule({
  declarations: [MainComponent, LayoutComponent, DetailComponent, EditCodeComponent],
  imports: [
    NgAlainBasicModule,
    SharedModule,
    CodingsRoutingModule,
    NgxsModule.forFeature([ThemeCoreState, CodingsState]),
    SettingManagementNgAlainModule
  ],
  providers: [
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CodingsModule { }
