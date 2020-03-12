import { ABP } from '@abp/ng.core';
import { FsCodingManagementDtos } from '@fs/coding-management';

export namespace CodingManagement {
    export interface State {
        codesResponse: FsCodingManagementDtos.codesResponse;
        codesPageQueryParams: FsCodingManagementDtos.codesPageQueryParams;
        code: FsCodingManagementDtos.code;
    }

}