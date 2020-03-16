import { NgModule } from '@angular/core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic'
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CodingsRoutingModule } from './codings-routing.module';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DelonFormModule } from '@delon/form';
import { FormsModule} from '@angular/forms';
import { CodingsState } from './providers/codings.state';
import { DetailComponent } from './detail/detail.component';
import { EditCodeComponent } from './modal/edit-code.component';
import { SettingManagementNgAlainModule } from '@fs/setting-management/ng-alain';

@NgModule({
  declarations: [MainComponent, LayoutComponent, DetailComponent, EditCodeComponent],
  imports: [
    NgAlainBasicModule,
    SharedModule,
    CodingsRoutingModule,
    NgxsModule.forFeature([CodingsState]),
    SettingManagementNgAlainModule
  ],
  providers: [
    
  ]
})
export class CodingsModule { }
