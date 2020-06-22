import { PatchCodeSettingsInput } from '@fs/coding-management';

export class PatchCodeSettingsByInputs{
    static readonly type = '[CodingManagement] Patch CodeSettings By Inputs';
    constructor(public payload?: PatchCodeSettingsInput) {}
}

export class PatchDefinitionByInputs{
    static readonly type = '[CodingManagement] Patch Definition By Inputs';
    constructor(public payload?: PatchCodeSettingsInput) {}
}
