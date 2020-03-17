import { ABP } from '@abp/ng.core';
import { CodingManagementDtos } from '@fs/coding-management';

export namespace Codings {
    export interface State {
        codingsResponse: CodingManagementDtos.codingsResponse;
        codingsPageQueryParams: CodingManagementDtos.codingsPageQueryParams;
        coding: CodingManagementDtos.coding;
    }
}