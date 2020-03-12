import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotifyService } from '../../shared/services/notify/notify.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { GetCodes, DeleteCode } from '../providers/coding-management.actions';
import { FsCodingManagementDtos } from '@fs/coding-management';
import { CodingManagementState } from '../providers/coding-management.state';
import { FsSettingManagementParameters } from '@fs/setting-management';

@Component({
  selector: 'fs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  @Select(CodingManagementState.getCodes)
  data$: Observable<Array<FsCodingManagementDtos.code>>;
  
  codeList: Array<FsCodingManagementDtos.code>;
  pageQuery: FsCodingManagementDtos.codesPageQueryParams = { skipCount: 0, maxResultCount: 999 } as FsCodingManagementDtos.codesPageQueryParams;
  loading: boolean = false;

  parameters = new FsSettingManagementParameters;
  constructor(
    private store: Store,
    private modalService: NzModalService,
    private notifyService: NotifyService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadData();
    this.data$.subscribe((x) => {
      if(x.length > 0){
        this.codeList = x.filter(x => x.definitionId == null).sort((a, b) => parseInt(a.no) - parseInt(b.no));
      } else {
        this.codeList = [];
      }
    });
  }

  loadData() {
    this.loading = true;
    this.store
      .dispatch(new GetCodes(this.pageQuery))
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => { },
      (error) => {
        this.notifyService.error('查詢失敗');
      });
  }

  editManageAction(item?){
    this.router.navigate(['/coding-management/codes', item]);
  }

  deleteNode(data?, type?){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: '確定是否刪除？',
      nzOkText: '是',
      nzCancelText: '否',
      nzOnOk:()=>{
        this.store.dispatch(new DeleteCode(data))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => {
          this.router.navigate(['/coding-management/codes']);
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
