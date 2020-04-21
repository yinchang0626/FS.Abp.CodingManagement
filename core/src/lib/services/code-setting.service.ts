import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CreateOrUpdateCodeSettingsInput, PostLoadCodeSettingsInputDto, PostLoadCodeSettingsOutputDto} from '../models';

@Injectable({providedIn: 'root'})
export class CodeSettingService {
  constructor(private restService: RestService) {}

 postGetCodeSettingsByCodeIdByCodeIds(body: any): Observable<any[]> {
   return this.restService.request({ url: '/api/CodingManagement/codeSetting/getCodeSettingsByCodeId', method: 'POST', body });
 }
 postLoadCodeSettingsByByInputs(body: PostLoadCodeSettingsInputDto): Observable<PostLoadCodeSettingsOutputDto[]> {
  return this.restService.request({ url: '/api/CodingManagement/codeSetting/loadCodeSettingsBy', method: 'POST', body });
}
 postCreateOrUpdateCodeSettingsByInput(body: CreateOrUpdateCodeSettingsInput): Observable<void> {
   return this.restService.request({ url: '/api/CodingManagement/codeSetting/createOrUpdateCodeSettings', method: 'POST', body });
 }
}


