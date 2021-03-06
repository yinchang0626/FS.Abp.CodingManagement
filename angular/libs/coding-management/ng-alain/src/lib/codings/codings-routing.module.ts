import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        // data: { requiredPolicy: 'AbpIdentity.Roles' },
        children: [
          {
            path: ':definitionId',
            component: DetailComponent,
            // data: { requiredPolicy: 'AbpIdentity.Roles' },
          }
        ]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingsRoutingModule { }
