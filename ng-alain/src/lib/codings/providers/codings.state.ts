import { Action, Selector, State, StateContext } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';
import { Codings } from './codings.models';
import { CodingManagementDtos, CodingManagementService } from '@fs/coding-management';
import { GetCodings, CreateCoding, DeleteCoding, UpdateCoding, UpdateListCodings, GetChildrenCodings } from './codings.actions';

@State<Codings.State>({
    name: 'CodingsState',
    defaults: { codingsResponse: {} } as Codings.State,
})
export class CodingsState {
    @Selector()
    static getCodings({ codingsResponse }: Codings.State): Array<CodingManagementDtos.coding> {
        return codingsResponse.items || [];
    }

    @Selector()
    static getChildrenCodings({ coding }: Codings.State): CodingManagementDtos.coding {
        return coding || null;
    }

    constructor(private codingManagementService: CodingManagementService) { }

    @Action(GetCodings)
    getCodings({ patchState }: StateContext<Codings.State>, { payload }: GetCodings) {
        return this.codingManagementService.getCodings(payload).pipe(
            tap(codingsResponse =>
                patchState({
                    codingsResponse
                })
            )
        );
    }

    @Action(GetChildrenCodings)
    getChildrenCodings({ patchState }: StateContext<Codings.State>, { payload }: GetChildrenCodings) {
        return this.codingManagementService.getChildrenCodings(payload).pipe(
            tap(coding =>
                patchState({
                    coding
                })
            )
        );
    }

    @Action(CreateCoding)
    createCoding({ dispatch }: StateContext<Codings.State>, { payload }: CreateCoding) {
        return this.codingManagementService.createCoding(payload)
                   .pipe(switchMap(() =>
                        (payload.parentId) ? dispatch(new GetChildrenCodings(payload.definitionId)) : dispatch(new GetCodings({ skipCount: 0, maxResultCount: 999 }))
                   ));
    }

    @Action(UpdateCoding)
    updateCoding({ dispatch }: StateContext<Codings.State>, { payload }: UpdateCoding) {
        return this.codingManagementService.updateCodingById(payload)
                   .pipe(switchMap(() => dispatch(new GetCodings({ skipCount: 0, maxResultCount: 999 }))));
    }

    @Action(UpdateListCodings)
    updateListCodings({ dispatch }: StateContext<Codings.State>, { payload }: UpdateListCodings) {
        return this.codingManagementService.updateListCodings(payload)
                   .pipe(switchMap(() =>
                        dispatch(new GetChildrenCodings(payload[0].definitionId))
                   ));
    }

    @Action(DeleteCoding)
    deleteCoding({ dispatch }: StateContext<Codings.State>, { payload }: DeleteCoding) {
        return this.codingManagementService.deleteCodingById(payload.id)
                   .pipe(switchMap(() => (
                       (payload.parentId) ? dispatch(new GetChildrenCodings(payload.definitionId)) : dispatch(new GetCodings({ skipCount: 0, maxResultCount: 999 }))
                   )));
    }
}