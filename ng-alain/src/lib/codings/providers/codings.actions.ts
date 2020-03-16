import { CodingManagementDtos } from '@fs/coding-management';
import { ABP } from '@abp/ng.core';

export class GetCodings{
    static readonly type = '[Codings] Get Codings';
    constructor(public payload?: CodingManagementDtos.codingsPageQueryParams) {}
}

export class GetChildrenCodings{
    static readonly type = '[Codings] Get ChildrenCodings';
    constructor(public payload?: string) {}
}

export class CreateCoding{
    static readonly type = '[Coding] Create Coding';
    constructor(public payload?: CodingManagementDtos.coding) {}
}

export class UpdateCoding{
    static readonly type = '[Coding] Update Coding';
    constructor(public payload?: CodingManagementDtos.coding) {}
}

export class UpdateListCodings{
    static readonly type = '[Codings] Update Codings';
    constructor(public payload?: Array<CodingManagementDtos.coding>) {}
}

export class DeleteCoding{
    static readonly type = '[Coding] Delete Coding';
    constructor(public payload?: CodingManagementDtos.coding) {}
}