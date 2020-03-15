import { NgModule } from '@angular/core';
import { CoreModule } from '@abp/ng.core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic';
import { NgxsModule } from '@ngxs/store';
import { NotifyService } from './services/notify/notify.service';
import { MessagesService } from './services/messages/messages.service';
import { CodingManagementModule} from '@fs/coding-management'

const COMPONENT = [
  
]

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CoreModule,
    CodingManagementModule,
    NgAlainBasicModule,
    //NgxsModule.forFeature([])
  ],
  exports: [...COMPONENT, NgAlainBasicModule,CodingManagementModule],
  providers: [
    NotifyService,
    MessagesService
  ]
})
export class SharedModule { }
