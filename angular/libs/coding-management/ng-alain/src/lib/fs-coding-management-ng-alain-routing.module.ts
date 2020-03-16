import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicLayoutComponent, AuthGuard, PermissionGuard } from '@abp/ng.core';
import { LayoutPassportComponent, LayoutDefaultComponent } from '@fs/ng-alain/basic';
import { CodingManagementModule } from './coding-management/coding-management.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'code' },
    {
        path: '',
        component: LayoutDefaultComponent,
        // canActivate: [AuthGuard, PermissionGuard],
        children: [
            {
                path: 'codes',
                loadChildren: () => CodingManagementModule
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
