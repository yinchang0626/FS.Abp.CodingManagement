import { CodingManagementDtos } from '@fs/coding-management';
import { ABP } from '@abp/ng.core';

export class GetCodes{
    static readonly type = '[Codes] Get Codes';
    constructor(public payload?: CodingManagementDtos.codesPageQueryParams) {}
}

export class GetChildrenCodes{
    static readonly type = '[Codes] Get ChildrenCodes';
    constructor(public payload?: string) {}
}

export class CreateCode{
    static readonly type = '[Code] Create Code';
    constructor(public payload?: CodingManagementDtos.code) {}
}

export class UpdateCode{
    static readonly type = '[Code] Update Code';
    constructor(public payload?: CodingManagementDtos.code) {}
}

export class UpdateListCodes{
    static readonly type = '[Codes] Update Codes';
    constructor(public payload?: Array<CodingManagementDtos.code>) {}
}

export class DeleteCode{
    static readonly type = '[Code] Delete Code';
    constructor(public payload?: CodingManagementDtos.code) {}
}