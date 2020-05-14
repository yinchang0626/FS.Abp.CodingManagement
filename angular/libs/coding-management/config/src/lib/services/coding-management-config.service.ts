import { addAbpRoutes, eLayoutType, ABP } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementConfigService {
  constructor() {
    const route = {
      name: 'Coding Management',
      path: 'coding-management',
      parentName: 'AbpUiNavigation::Menu:Administration',
      // requiredPolicy: 'AbpAccount.SettingManagement',
      requiredPolicy: 'FS.Abp.CodingManagement.Core.DevelopPage',
      layout: eLayoutType.application,
      order: 7,
      iconClass: 'fa fa-cog',
      children: [
        {
          path: 'codings',
          name: '代碼表',
          order: 1,
          requiredPolicy: 'FS.Abp.CodingManagement.Core.DevelopPage',
        },
      ]
    } as ABP.FullRoute;

    addAbpRoutes(route);
  }
}
