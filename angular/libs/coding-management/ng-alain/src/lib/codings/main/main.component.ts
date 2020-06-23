import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as _ from 'lodash';
import { ThemeCoreState, CodingWithSettingsDto, GetAllDefinitions, GetSettingsGroups } from '@fs/theme.core';
import { PatchCodeSettingsByInputs } from '@fs/coding-management';

@Component({
  selector: 'fs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  @Select(ThemeCoreState.getAllDefinitions())
  data$: Observable<Array<CodingWithSettingsDto>>;

  @Select(ThemeCoreState.getSettingsGroups())
  settingdata$: Observable<Array<string>>;
  
  settingGroups: Array<string> = null;
  codeList: Array<CodingWithSettingsDto> = null;
  selectedDefinition: CodingWithSettingsDto = null;
  selectedSetting: CodingWithSettingsDto = null;
  loading: boolean = false;
  providerName: string = null;
  providerKey: string = null;

  protected _visible: boolean = false;

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    if (value === this._visible) return;
    this._visible = (value) ? true : false;
    if (!value) {
      this.loadData();
      this._visible = false;
    }
  }

  constructor(
    private store: Store,
    private modalService: NzModalService,
    private notifyService: NotifyService
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.data$.subscribe((x) => {
      this.codeList = null;
      this.selectedDefinition = null;
      if(x){
        this.codeList = x;
      }
    });

    this.settingdata$.subscribe(x => {
      this.settingGroups = null;
      if(x){
        let settingGroup = _.uniq(x);
        this.settingGroups = settingGroup.filter((x, i, arr) => {
          return arr.filter((y, j) => i != j && _.startsWith(x, y + ".")).length == 0;
      })
      }
    });
  }

  loadData() {
    this.loading = true;
    this.store
      .dispatch(new GetAllDefinitions())
      .pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.store.dispatch(new GetSettingsGroups()))
      )
      .subscribe((x) => {},
      (error) => {
        this.notifyService.error('查詢失敗');
      });
  }

  editManageAction(item?){
    this.selectedDefinition = item;
  }

  deleteNode(id?){
    this.loading = true;
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: '確定是否刪除？',
      nzOkText: '是',
      nzCancelText: '否',
      nzOnOk:()=>{
        let input = {
          editItems: [],
          deleteItemIds: [
            id
          ],
          definitionNos: null
        };
        this.store.dispatch(new PatchCodeSettingsByInputs(input))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => {
          this.notifyService.success("資料更新成功");
        }, (error) => {
          this.notifyService.error("資料更新失敗");
        });
      }
    });
  }

  setting(visible, data){
    this.visible = visible;
    this.providerName = "Codes";
    this.providerKey = data.codes.id;
    this.selectedSetting = data;
  }
}
