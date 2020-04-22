import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicLayoutComponent, AuthGuard, PermissionGuard } from '@abp/ng.core';
import { CodingsModule } from './codings/codings.module';

export function LoadCodingModule() {
    return CodingsModule;
  }

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'code' },
    {
        path: '',
        component: DynamicLayoutComponent,
        // canActivate: [AuthGuard, PermissionGuard],
        children: [
            {
                path: 'codings',
                loadChildren: LoadCodingModule
            }
        ],
    }
];
// @dynamic
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CodingManagementNgAlainRoutingModule { }
