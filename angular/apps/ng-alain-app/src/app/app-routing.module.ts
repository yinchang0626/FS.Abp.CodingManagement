import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  ABP } from '@abp/ng.core';
import { LazyLibsRoutes } from './lazy-libs/lazy-libs-routes.module';
//import { LayoutDefaultComponent } from '@fs/ng-alain';
//import { AuthGuard } from '@fs/core';
const routes: Routes = [
    //{//default
    //    path: '',
    //    redirectTo: 'main',
    //    pathMatch: 'full'
    //},

    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: {
            routes: {
                name: '::Menu:Home',
                parentName: 'AbpUiNavigation::Menu:Administration',
                path: '',
                iconClass: 'fa fa-home',
            } as ABP.Route,
        },
    },
    {
        path:'',
        children:LazyLibsRoutes
    },
    ...LazyLibsRoutes,
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
            // Pls refer to https://ng-alain.com/components/reuse-tab
            scrollPositionRestoration: 'top',
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
