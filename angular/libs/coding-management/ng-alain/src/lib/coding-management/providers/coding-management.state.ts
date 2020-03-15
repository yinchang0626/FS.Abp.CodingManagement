import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { CodingManagement } from './coding-management.models';
import { CodingManagementDtos, CodingManagementService } from '@fs/coding-management';
import { GetCodes, CreateCode, DeleteCode, UpdateCode, UpdateListCodes, GetChildrenCodes } from './coding-management.actions';

@State<CodingManagement.State>({
    name: 'CodingManagementState',
    defaults: { codesResponse: {} } as CodingManagement.State,
})
export class CodingManagementState {
    @Selector()
    static getCodes({ codesResponse }: CodingManagement.State): Array<CodingManagementDtos.code> {
        return codesResponse.items || [];
    }

    @Selector()
    static getChildrenCodes({ code }: CodingManagement.State): CodingManagementDtos.code {
        return code || null;
    }

    constructor(private CodingManagementService: CodingManagementService) { }

    @Action(GetCodes)
    getCodes({ patchState }: StateContext<CodingManagement.State>, { payload }: GetCodes) {
        return this.CodingManagementService.getCodes(payload).pipe(
            tap(codesResponse =>
                patchState({
                    codesResponse
                })
            )
        );
    }

    @Action(GetChildrenCodes)
    getChildrenCodes({ patchState }: StateContext<CodingManagement.State>, { payload }: GetChildrenCodes) {
        return this.CodingManagementService.getChildrenCodes(payload).pipe(
            tap(code =>
                patchState({
                    code
                })
            )
        );
    }

    @Action(CreateCode)
    createCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: CreateCode) {
        return this.CodingManagementService.createCode(payload)
                   .pipe(switchMap(() =>
                        (payload.parentId) ? dispatch(new GetChildrenCodes(payload.definitionId)) : dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))
                   ));
    }

    @Action(UpdateCode)
    updateCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: UpdateCode) {
        return this.CodingManagementService.updateCodeById(payload)
                   .pipe(switchMap(() => dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))));
    }

    @Action(UpdateListCodes)
    updateListCodes({ dispatch }: StateContext<CodingManagement.State>, { payload }: UpdateListCodes) {
        return this.CodingManagementService.updateListCodes(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetChildrenCodes(payload[0].definitionId))
                   ));
    }

    @Action(DeleteCode)
    deleteCode({ dispatch }: StateContext<CodingManagement.State>, { payload }: DeleteCode) {
        return this.CodingManagementService.deleteCodeById(payload.id)
                   .pipe(switchMap(() => (
                       (payload.parentId) ? dispatch(new GetChildrenCodes(payload.definitionId)) : dispatch(new GetCodes({ skipCount: 0, maxResultCount: 999 }))
                   )));
    }
}