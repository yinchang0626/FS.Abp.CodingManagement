import { addAbpRoutes, eLayoutType, RestService, ABP } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementConfigService {
  constructor(private router: Router, private restService: RestService) {
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

    // setTimeout(() => {
    //   const tabs = getSettingTabs();
    //   if (!tabs || !tabs.length) {
    //     this.store.dispatch(new PatchRouteByName('AbpSettingManagement::Settings', { ...route, invisible: true }));
    //   }
    // });
  }
}
