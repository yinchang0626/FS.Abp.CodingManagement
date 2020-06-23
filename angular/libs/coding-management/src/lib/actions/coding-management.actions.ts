import { PatchCodeSettingsInput } from '../dtos';

export class PatchCodeSettingsByInputs{
    static readonly type = '[CodingManagement] Patch CodeSettings By Inputs';
    constructor(public payload?: PatchCodeSettingsInput) {}
}
