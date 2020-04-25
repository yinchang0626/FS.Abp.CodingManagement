import { Routes } from '@angular/router';

export const LazyLibsRoutes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./account-wrapper.module').then(m => m.AccountWrapperModule)
    },
    {
        path: 'identity',
        loadChildren: () => import('./identity-wrapper.module').then(m => m.IdentityWrapperModule),
    },
    {
        path: 'tenant-management',
        loadChildren: () => import('./tenant-management-wrapper.module').then(m => m.TenantManagementWrapperModule),
    },
    {
        path: 'setting-management',
        loadChildren: () => import('./setting-management-wrapper.module').then(m => m.SettingManagementWrapperModule),
    },
    {
        path: 'coding-management',
        loadChildren: () => import('./coding-management-wrapper.module').then(m => m.CodingManagementWrapperModule),
    }
];

