import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { Codings } from './codings.models';
import { CodingManagementService } from 'libs/coding-management/src/lib';
import { PatchCodeSettingsByInputs, PatchDefinitionByInputs } from './codings.actions';
import { GetChildrenByNos, GetAllDefinitions } from '@fs/theme.core';

@State<Codings.State>({
    name: 'CodingsState',
    defaults: {} as Codings.State,
})
export class CodingsState {

    constructor(private codingManagementService: CodingManagementService) { }
    
    @Action(PatchDefinitionByInputs)
    poatchDefinitionByInputs({ dispatch }: StateContext<Codings.State>, { payload }: PatchDefinitionByInputs) {
        return this.codingManagementService.postPatchCodeSettingsByInputs(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetAllDefinitions())
                ));
    }

    @Action(PatchCodeSettingsByInputs)
    patchCodeSettingsByInputs({ dispatch }: StateContext<Codings.State>, { payload }: PatchCodeSettingsByInputs) {
        let definitionNos = {
            definitionNos: payload['definitionNos']
        };
        delete  payload['definitionNos']
        return this.codingManagementService.postPatchCodeSettingsByInputs(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetChildrenByNos(definitionNos))
                ));
    }
}