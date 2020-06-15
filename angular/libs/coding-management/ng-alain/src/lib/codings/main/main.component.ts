import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SettingManagementParameters } from '@fs/setting-management';
import * as _ from 'lodash';
import { ThemeCoreState, CodeSettingsDto, GetAllDefinitions, GetSettingsGroups, GetChildrenByNo } from '@fs/theme.core';
import { PatchCodeSettingsByInputs } from '../providers/codings.actions';

@Component({
  selector: 'fs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  @Select(ThemeCoreState.getAllDefinitions())
  data$: Observable<Array<CodeSettingsDto>>;

  @Select(ThemeCoreState.getSettingsGroups())
  settingdata$: Observable<Array<string>>;
  
  settingGroups: Array<string> = null;
  codeList: Array<CodeSettingsDto> = null;
  selectItem: Array<CodeSettingsDto> = null;
  loading: boolean = false;
  
  parameters = new SettingManagementParameters;
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
      this.selectItem = null;
      if(x){
        this.codeList = x;
        this.store.dispatch(new GetChildrenByNo(
          {
            "definitionNos": [
              "Test","www"
            ]
          }
        )).subscribe();
      }
    });

    this.settingdata$.subscribe(x => {
      this.settingGroups = null;
      if(x){
        this.settingGroups =x
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
    this.selectItem = item;
  }

  deleteNode(id?){
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
          ]
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

  setting(visible, providerKey){
    this.parameters = {
      providerKey: providerKey,
      providerName: 'Codes',
      visible: visible,
      routerName: null
    };
  }
}
