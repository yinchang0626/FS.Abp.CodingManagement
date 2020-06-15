import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CodingsState } from '../providers/codings.state';
import * as _ from 'lodash';
import { FsNgAlainTreeComponent } from '@fs/ng-alain/basic';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd';
import { SettingManagementParameters } from '@fs/setting-management';

@Component({
  selector: 'fs-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  @ViewChild(FsNgAlainTreeComponent, {static: false}) fsNgAlainTreeComponent: FsNgAlainTreeComponent;

  @Input()
  detailData = null;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
   
  }

  init(){
    this.changeDetectorRef.detectChanges();
    this.fsNgAlainTreeComponent.init();
  }

  ngOnChanges() {
    
  }

  buildForm() {
    
  }

  save() {
   
  }

  deleteNode(id?){
    
  }
}
