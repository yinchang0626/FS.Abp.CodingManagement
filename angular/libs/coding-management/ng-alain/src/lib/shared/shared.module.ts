import { NgModule } from '@angular/core';
import { NgAlainBasicModule } from '@fs/ng-alain/basic';

const COMPONENT = []

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    NgAlainBasicModule,
  ],
  exports: [...COMPONENT, NgAlainBasicModule],
  providers: [
  ]
})
export class SharedModule { }
