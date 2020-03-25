import { RestService , PagedResultDto} from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CodesCreateInput, CodesDto, CodesWithDetailsDto, CodesMoveInput, CodesGetListInput, CodesUpdateInput} from '../models';

@Injectable({providedIn: 'root'})
export class CodesTreeService {
  constructor(private restService: RestService) {}

 createListByInput(body: CodesCreateInput): Observable<void> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree/list', method: 'POST', body });
 }
 updateListByInput(body: any): Observable<void> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree/list', method: 'PUT', body });
 }
 findChildrenByParentIdAndRecursive(recursive: boolean = False, parentId: string?): Observable<CodesDto[]> {
   return this.restService.request({ url: `/api/CodingManagement/codesTree/findChildren/${parentId}`, method: 'POST', params: { recursive } });
 }
 getDefinitionByNo(no: string): Observable<CodesWithDetailsDto> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree/definition', method: 'GET', params: { no } });
 }
 deleteClearDefinitionCacheByNo(no: string): Observable<void> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree/clearDefinitionCache', method: 'DELETE', params: { no } });
 }
 moveByInput(body: CodesMoveInput): Observable<CodesWithDetailsDto> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree/move', method: 'POST', body });
 }
 getById(id: string): Observable<CodesWithDetailsDto> {
   return this.restService.request({ url: `/api/CodingManagement/codesTree/${id}`, method: 'GET' });
 }
 getListByInput(params = {} as CodesGetListInput): Observable<PagedResultDto<CodesWithDetailsDto>> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree', method: 'GET', params });
 }
 createByInput(body: CodesCreateInput): Observable<CodesWithDetailsDto> {
   return this.restService.request({ url: '/api/CodingManagement/codesTree', method: 'POST', body });
 }
 updateByIdAndInput(body: CodesUpdateInput, id: string): Observable<CodesWithDetailsDto> {
   return this.restService.request({ url: `/api/CodingManagement/codesTree/${id}`, method: 'PUT', body });
 }
 deleteById(id: string): Observable<void> {
   return this.restService.request({ url: `/api/CodingManagement/codesTree/${id}`, method: 'DELETE' });
 }
}
