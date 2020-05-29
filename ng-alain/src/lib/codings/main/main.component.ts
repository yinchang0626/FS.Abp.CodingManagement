import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { GetCodings, DeleteCoding } from '../providers/codings.actions';
import { CodingManagementDtos } from '@fs/coding-management';
import { CodingsState } from '../providers/codings.state';
import { SettingManagementParameters } from '@fs/setting-management';
import * as _ from 'lodash';

@Component({
  selector: 'fs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  @Select(CodingsState.getCodings)
  data$: Observable<Array<CodingManagementDtos.coding>>;
  
  codeList: Array<CodingManagementDtos.coding>;
  pageQuery: CodingManagementDtos.codingsPageQueryParams = { skipCount: 0, maxResultCount: 999 } as CodingManagementDtos.codingsPageQueryParams;
  loading: boolean = false;

  parameters = new SettingManagementParameters;
  constructor(
    private store: Store,
    private modalService: NzModalService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadData();
    this.data$.subscribe((x) => {
      if(x.length > 0){
        this.codeList = _.sortBy(x.filter(x => x.definitionId == null), 'no');
      } else {
        this.codeList = [];
      }
    });
  }

  loadData() {
    this.loading = true;
    this.store
      .dispatch(new GetCodings(this.pageQuery))
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => { },
      (error) => {
        this.notifyService.error('查詢失敗');
      });
  }

  editManageAction(item?){
    this.router.navigate(['.', item],{relativeTo: this.activatedRoute});
  }

  deleteNode(data?, type?){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: '確定是否刪除？',
      nzOkText: '是',
      nzCancelText: '否',
      nzOnOk:()=>{
        this.store.dispatch(new DeleteCoding(data))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => {
          this.router.navigate(['.'],{relativeTo: this.activatedRoute});
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
