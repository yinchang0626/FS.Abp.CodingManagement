import { ABP } from '@abp/ng.core';

export namespace FsCodingManagementDtos {

    export type codesResponse = ABP.PagedResponse<code>;

    export interface codesPageQueryParams extends ABP.PageQueryParams {}

    export interface code {
        id: string,
        no: string,
        displayName: string,
        description: string,
        definitionId: string,
        code: string,
        parentId: string
    }
}