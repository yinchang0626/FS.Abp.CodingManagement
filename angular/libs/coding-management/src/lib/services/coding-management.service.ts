import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService, Rest, ABP } from '@abp/ng.core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementService {
  constructor(private restService: RestService) {}

  postPatchCodeSettingsByInputs(body: any): Observable<any[]> {
    return this.restService.request({ url: '/api/CodingManagement/codeSetting/patch', method: 'POST', body });
  }

}
