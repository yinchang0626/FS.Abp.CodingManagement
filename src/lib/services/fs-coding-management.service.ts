import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService, Rest, ABP } from '@abp/ng.core';
import { CodingManagementDtos } from '../dtos/fs-coding-management.dtos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementService {
  constructor(private rest: RestService) {}

  getCodes(params = {} as CodingManagementDtos.codesPageQueryParams): Observable<CodingManagementDtos.codesResponse> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url: `/api/CodingManagement/codesTree`,
      params
    };

    return this.rest.request<null, CodingManagementDtos.codesResponse>(request);
  }

  getChildrenCodes(id: string): Observable<CodingManagementDtos.code> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url : `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<null, CodingManagementDtos.code>(request);
  }

  createCode(body = {} as CodingManagementDtos.code): Observable<CodingManagementDtos.code> {
    const request: Rest.Request<CodingManagementDtos.code> = {
      method: 'POST',
      url: '/api/CodingManagement/codesTree',
      body
    };

    return this.rest.request<CodingManagementDtos.code, CodingManagementDtos.code>(request);
  }

  updateCodeById(body: CodingManagementDtos.code): Observable<CodingManagementDtos.code> {
    const request: Rest.Request<CodingManagementDtos.code> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/${body.id}`,
      body
    };

    return this.rest.request<CodingManagementDtos.code, CodingManagementDtos.code>(request);
  }

  updateListCodes(body: Array<CodingManagementDtos.code>): Observable<Array<CodingManagementDtos.code>> {
    const request: Rest.Request<Array<CodingManagementDtos.code>> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/List`,
      body
    };

    return this.rest.request<Array<CodingManagementDtos.code>, Array<CodingManagementDtos.code>>(request);
  }

  deleteCodeById(id: string): Observable<CodingManagementDtos.code> {
    const request: Rest.Request<string> = {
      method: 'DELETE',
      url: `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<string, CodingManagementDtos.code>(request);
  }
}
