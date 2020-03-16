import { ABP } from '@abp/ng.core';
import { CodingManagementDtos } from '@fs/coding-management';

export namespace CodingManagement {
    export interface State {
        codesResponse: CodingManagementDtos.codesResponse;
        codesPageQueryParams: CodingManagementDtos.codesPageQueryParams;
        code: CodingManagementDtos.code;
    }

}