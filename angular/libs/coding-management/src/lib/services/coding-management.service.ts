import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService, Rest, ABP } from '@abp/ng.core';
import { CodingManagementDtos } from '../dtos/coding-management.dtos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CodingManagementService {
  constructor(private rest: RestService) {}

  getCodings(params = {} as CodingManagementDtos.codingsPageQueryParams): Observable<CodingManagementDtos.codingsResponse> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url: `/api/CodingManagement/codesTree`,
      params
    };

    return this.rest.request<null, CodingManagementDtos.codingsResponse>(request);
  }

  getChildrenCodings(id: string): Observable<CodingManagementDtos.coding> {
    const request: Rest.Request<null> = {
      method: 'GET',
      url : `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<null, CodingManagementDtos.coding>(request);
  }

  createCoding(body = {} as CodingManagementDtos.coding): Observable<CodingManagementDtos.coding> {
    const request: Rest.Request<CodingManagementDtos.coding> = {
      method: 'POST',
      url: '/api/CodingManagement/codesTree',
      body
    };

    return this.rest.request<CodingManagementDtos.coding, CodingManagementDtos.coding>(request);
  }

  updateCodingById(body: CodingManagementDtos.coding): Observable<CodingManagementDtos.coding> {
    const request: Rest.Request<CodingManagementDtos.coding> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/${body.id}`,
      body
    };

    return this.rest.request<CodingManagementDtos.coding, CodingManagementDtos.coding>(request);
  }

  updateListCodings(body: Array<CodingManagementDtos.coding>): Observable<Array<CodingManagementDtos.coding>> {
    const request: Rest.Request<Array<CodingManagementDtos.coding>> = {
      method: 'PUT',
      url: `/api/CodingManagement/codesTree/List`,
      body
    };

    return this.rest.request<Array<CodingManagementDtos.coding>, Array<CodingManagementDtos.coding>>(request);
  }

  deleteCodingById(id: string): Observable<CodingManagementDtos.coding> {
    const request: Rest.Request<string> = {
      method: 'DELETE',
      url: `/api/CodingManagement/codesTree/${id}`,
    };

    return this.rest.request<string, CodingManagementDtos.coding>(request);
  }
}
