import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicLayoutComponent, AuthGuard, PermissionGuard } from '@abp/ng.core';
import { CodingsModule } from './codings/codings.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'code' },
    {
        path: '',
        component: DynamicLayoutComponent,
        // canActivate: [AuthGuard, PermissionGuard],
        children: [
            {
                path: 'codings',
                loadChildren: () => CodingsModule
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
