import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { CodingManagement } from './coding-management.models';
import { FsCodingManagementDtos, FsCodingManagementService } from '@fs/coding-management';
import { GetCodes, CreateCode, DeleteCode, UpdateCode, UpdateListCodes, GetChildrenCodes } from './coding-management.actions';

@State<CodingManagement.State>({
    name: 'FsCodingManagementState',
    defaults: { codesResponse: {} } as CodingManagement.State,
})
export class CodingManagementState {
    @Selector()
    static getCodes({ codesResponse }: CodingManagement.State): Array<FsCodingManagementDtos.code> {
        return codesResponse.items || [];
    }

    @Selector()
    static getChildrenCodes({ code }: CodingManagement.State): FsCodingManagementDtos.code {
        return code || null;
    }

    constructor(private fsCodingManagementService: FsCodingManagementService) { }

    @Action(GetCodes)
    getCodes({ patchState }: StateContext<CodingManagement.State>, { payload }: GetCodes) {
        return this.fsCodingManagementService.getCodes(payload).pipe(
            tap(codesResponse =>
                patchState({
                    codesResponse
                })
            )
        );
    }

    @Action(GetChildrenCodes)
    getChildrenCodes({ patchState }: StateContext<CodingManagement.State>, { payload }: GetChildrenCodes) {
        return this.fsCodingManagementService.getChildrenCodes(payload).pipe(
            tap(code =>
                patchState({
                    code
                })
            )
        );
    }

    @Action(CreateCode)
    createCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: CreateCode) {
        return this.fsCodingManagementService.createCode(payload)
                   .pipe(switchMap(() =>
                        (payload.parentId) ? dispatch(new GetChildrenCodes(payload.definitionId)) : dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))
                   ));
    }

    @Action(UpdateCode)
    updateCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: UpdateCode) {
        return this.fsCodingManagementService.updateCodeById(payload)
                   .pipe(switchMap(() => dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))));
    }

    @Action(UpdateListCodes)
    updateListCodes({ dispatch }: StateContext<CodingManagement.State>, { payload }: UpdateListCodes) {
        return this.fsCodingManagementService.updateListCodes(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetChildrenCodes(payload[0].definitionId))
                   ));
    }

    @Action(DeleteCode)
    deleteCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: DeleteCode) {
        return this.fsCodingManagementService.deleteCodeById(payload.id)
                   .pipe(switchMap(() => (
                       (payload.parentId) ? dispatch(new GetChildrenCodes(payload.definitionId)) : dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))
                   )));
    }
}