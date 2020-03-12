import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService, Rest, ABP } from '@abp/ng.core';
import { FsCodingManagementDtos } from '../dtos/fs-coding-management.dtos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FsCodingManagementService {
  constructor(private rest: RestService) {}

  getCodes(params = {} as FsCodingManagementDtos.codesPageQueryParams): Observable<FsCodingManagementDtos.codesResponse> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url: `/api/CodingManagement/codesTree`,
      params
    };

    return this.rest.request<null, FsCodingManagementDtos.codesResponse>(request);
  }

  getChildrenCodes(id: string): Observable<FsCodingManagementDtos.code> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url : `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<null, FsCodingManagementDtos.code>(request);
  }

  createCode(body = {} as FsCodingManagementDtos.code): Observable<FsCodingManagementDtos.code> {
    const request: Rest.Request<FsCodingManagementDtos.code> = {
      method: 'POST',
      url: '/api/CodingManagement/codesTree',
      body
    };

    return this.rest.request<FsCodingManagementDtos.code, FsCodingManagementDtos.code>(request);
  }

  updateCodeById(body: FsCodingManagementDtos.code): Observable<FsCodingManagementDtos.code> {
    const request: Rest.Request<FsCodingManagementDtos.code> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/${body.id}`,
      body
    };

    return this.rest.request<FsCodingManagementDtos.code, FsCodingManagementDtos.code>(request);
  }

  updateListCodes(body: Array<FsCodingManagementDtos.code>): Observable<Array<FsCodingManagementDtos.code>> {
    const request: Rest.Request<Array<FsCodingManagementDtos.code>> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/List`,
      body
    };

    return this.rest.request<Array<FsCodingManagementDtos.code>, Array<FsCodingManagementDtos.code>>(request);
  }

  deleteCodeById(id: string): Observable<FsCodingManagementDtos.code> {
    const request: Rest.Request<string> = {
      method: 'DELETE',
      url: `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<string, FsCodingManagementDtos.code>(request);
  }
}
