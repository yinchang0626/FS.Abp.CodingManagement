import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { GetChildrenByNos, GetAllDefinitions } from '@fs/theme.core';
import { CodingManagementService } from '../services';
import { PatchCodeSettingsByInputs } from '../actions/coding-management.actions';
import { CodingManagement } from '../models/coding-management.models';
import * as _ from 'lodash';

@State<CodingManagement.State>({
    name: 'CodingManagementState',
    defaults: {} as CodingManagement.State,
})
export class CodingManagementState {

    constructor(private codingManagementService: CodingManagementService) { }

    @Action(PatchCodeSettingsByInputs)
    patchCodeSettingsByInputs({ dispatch }: StateContext<CodingManagement.State>, { payload }: PatchCodeSettingsByInputs) {
        let Nos = (payload.definitionNos) ? { definitionNos: payload.definitionNos} : null;
        delete payload.definitionNos;
        payload.editItems.forEach((x, i) => {
            payload.editItems[i].settings = x.settings.map(y => {
                let key =  _.findKey(y, function(o) { return o !== undefined; });
                return {
                    "name": key,
                    "value": y[key]
                }
            });
        });
        return this.codingManagementService.postPatchCodeSettingsByInputs(payload)
                   .pipe(switchMap(() =>
                        (Nos) ? dispatch(new GetChildrenByNos(Nos)) :  dispatch(new GetAllDefinitions())
                ));
    }
}