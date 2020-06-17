import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { Codings } from './codings.models';
import { CodingManagementService } from 'libs/coding-management/src/lib';
import { PatchCodeSettingsByInputs } from './codings.actions';
import { GetAllDefinitions } from '@fs/theme.core';

@State<Codings.State>({
    name: 'CodingsState',
    defaults: {} as Codings.State,
})
export class CodingsState {

    constructor(private codingManagementService: CodingManagementService) { }

    @Action(PatchCodeSettingsByInputs)
    patchCodeSettingsByInputs({ dispatch }: StateContext<Codings.State>, { payload }: PatchCodeSettingsByInputs) {
        return this.codingManagementService.postPatchCodeSettingsByInputs(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetAllDefinitions())
                   ));
    }
}