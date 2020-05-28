import { addAbpRoutes, ConfigStateService, eLayoutType, ABP } from '@abp/ng.core';
import { Injectable, Injector } from '@angular/core';
import { ThemeCoreService, IConfigService } from '@fs/theme.core';
import { Store } from '@ngxs/store';
import { concat, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementConfigService implements IConfigService {

  get configStateService(): ConfigStateService {
    return this.injector.get(ConfigStateService);
  }
  get themeCoreService(): ThemeCoreService {
    return this.injector.get(ThemeCoreService);
  }

  get store(): Store {
    return this.injector.get(Store);
  }

  constructor(private injector: Injector) {
  }


  registerRoutes(): Observable<any> {   
   const route = {
      name: 'Coding Management',
      path: 'coding-management',
      parentName: 'AbpUiNavigation::Menu:Administration',      
      requiredPolicy: 'FS.Abp.CodingManagement.Core.DevelopPage',
      layout: eLayoutType.application,
      order: 7,
      iconClass: 'fa fa-cog',
      profile: {
        title: 'Coding Management',
        doc: 'Coding Management',
        nav: { routeName: 'Coding Management' }
      },      
      children: [
        {
          path: 'codings',
          name: '代碼表',
          order: 1,
          requiredPolicy: 'FS.Abp.CodingManagement.Core.DevelopPage',
        },
      ]
    };
    let codingRoute$ = this.themeCoreService.dispatchAddOrPatchRoute(route);  
    return concat(codingRoute$);
  }



}
