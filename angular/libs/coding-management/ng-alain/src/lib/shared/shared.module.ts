import { NgModule } from '@angular/core';
import { CoreModule } from '@abp/ng.core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic';
import { NgxsModule } from '@ngxs/store';
import { NotifyService } from './services/notify/notify.service';
import { MessagesService } from './services/messages/messages.service';
import { CodeProcessService } from './services/code-process/code-process.service';

const COMPONENT = []

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    NgAlainBasicModule,
  ],
  exports: [...COMPONENT, NgAlainBasicModule],
  providers: [
    CodeProcessService,
    NotifyService,
    MessagesService
  ]
})
export class SharedModule { }
