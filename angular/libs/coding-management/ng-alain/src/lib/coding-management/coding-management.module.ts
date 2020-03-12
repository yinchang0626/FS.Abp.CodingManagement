import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { CodingManagementRoutingModule } from './coding-management-routing.module';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DelonFormModule } from '@delon/form';
import { FormsModule} from '@angular/forms';
import { CodingManagementState } from './providers/coding-management.state';
import { DetailComponent } from './detail/detail.component';
import { EditCodeComponent } from './modal/edit-code.component';
import { FsSettingManagementNgAlainModule } from '@fs/setting-management/ng-alain';

@NgModule({
  declarations: [MainComponent, LayoutComponent, DetailComponent, EditCodeComponent],
  imports: [
    CommonModule,
    SharedModule,
    CodingManagementRoutingModule,
    NgxsModule.forFeature([CodingManagementState]),
    FormsModule,
    NgZorroAntdModule,
    DelonFormModule.forRoot(),
    FsSettingManagementNgAlainModule
  ],
  providers: [
    
  ]
})
export class CodingManagementModule { }
