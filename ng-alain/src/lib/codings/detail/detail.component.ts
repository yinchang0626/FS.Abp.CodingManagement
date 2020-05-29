import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteCoding, UpdateListCodings, GetChildrenCodings } from '../providers/codings.actions';
import { CodingsState } from '../providers/codings.state';
import { CodingManagementDtos } from '@fs/coding-management';
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

  @Select(CodingsState.getChildrenCodings)
  data$: Observable<CodingManagementDtos.coding>;

  rowData: Array<CodingManagementDtos.coding>;
  form: FormGroup;
  loading: boolean = false;
  definitionId: string;

  level: number = null;
  root = {};
  data = [];
  treeData = [];
  treeValue = [];
  openSelect = [];
  expandedKeys = [];
  nodeData = {};
  isEdit = {};
  isSeletedItem: string = "";

  parameters = new SettingManagementParameters;
  constructor(
    private modalService: NzModalService,
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private nzContextMenuService: NzContextMenuService,
  ) {
    this.activatedRoute.params.subscribe(queryParams => {
      this.definitionId = queryParams['definitionId'] || null;
      this.form = new FormGroup({});
      if(this.definitionId){
        this.loadData();
      }
    });
  }

  ngOnInit() {
    this.data$.subscribe((x) => {
      this.nzContextMenuService.close();
      this.root = {};
      this.data = [];
      this.treeData = [];
      this.treeValue = [];
      this.openSelect = [];
      this.nodeData = {};
      this.isEdit = {};
      this.isSeletedItem = "";
      if(x && this.definitionId){
        this.root = x;
        this.rowData = this.data = _.sortBy(x['codeList'], 'no');
        this.expandedKeys = this.data.map(x => x.id);
        this.level = (this.rowData.length <= 0) ? 0 : _.maxBy(this.rowData, function(o){
          return o.code.split('.').length;
        }).code.split('.').length;
        for(let i = 0; i < this.level; i++){
            this.treeData.push((i === 0) ? _.sortBy(x['codeList'], 'no') : []);
            this.treeValue.push({});
            this.openSelect.push((i === 0) ? true : false);
        }
        this.init();
        this.buildForm();
      } else {
        this.init();
      }
    });
  }

  init(){
    this.changeDetectorRef.detectChanges();
    this.fsNgAlainTreeComponent.init();
  }

  loadData() {
    if(this.definitionId){
      this.loading = true;
      this.store
        .dispatch(new GetChildrenCodings(this.definitionId))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => { },
        (error) => {
          this.notifyService.error('查詢失敗');
        });
    }
  }

  buildForm() {
    let data = {};
    this.rowData.forEach((x, i) => {
      data[x.id] = this.fb.group({
        no: [x.no, [Validators.required]],
        name: [x.displayName, [Validators.required]],
        enable: [x.enable, [Validators.required]],
        description: [x.description, []],
      })
    });

    console.log(this.rowData, data)
    
    this.form = this.fb.group(data);
    this.form.valueChanges.subscribe(x => {
      this.isEdit = {};
      Object.keys(x).forEach((key) => {
        let raw = this.rowData.filter(x => x.id === key)[0];
        let no = (typeof (x[key].no) != "string") ? JSON.stringify(x[key].no) : x[key].no;
        let name = (typeof (x[key].name) != "string") ? JSON.stringify(x[key].name) : x[key].name;
        let description = (typeof (x[key].description) != "string" && x[key].description != null) ? JSON.stringify(x[key].description) : x[key].description;
        let enable = x[key].enable;
        let isEdit = (raw.no !== no || raw.displayName !== name || raw.description !== description || raw.enable !== enable);
        if(isEdit) this.isEdit[key] = true;
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  save() {
    let updateInput: Array<CodingManagementDtos.coding> = [] as Array<CodingManagementDtos.coding> ;
    this.rowData.forEach(x => {
      if (this.isEdit[x.id]){
        let no = (typeof (this.form.value[x.id].no) !== "string") ? JSON.stringify(this.form.value[x.id].no) : this.form.value[x.id].no;
        let name = (typeof (this.form.value[x.id].name) !== "string") ? JSON.stringify(this.form.value[x.id].name) : this.form.value[x.id].name;
        let description = (typeof (this.form.value[x.id].description) !== "string" && this.form.value[x.id].description != null) ? JSON.stringify(this.form.value[x.id].description) : this.form.value[x.id].description;
        updateInput.push({
          "id": x.id,
          "no": no,
          "displayName": name,
          "description": description,
          "definitionId": x.definitionId,
          "code": x.code,
          "parentId": x.parentId,
          "enable": this.form.value[x.id].enable
        });
      }
    });
    this.loading = true;
    this.store.dispatch(
      new UpdateListCodings(updateInput)
    )
    .pipe(finalize(() => this.loading = false))
    .subscribe((x) => {
        this.router.navigate(['/coding-management/codings', this.definitionId]);
        this.notifyService.success("資料更新成功");
    }, (error) => {
        this.notifyService.error("資料更新失敗");
    });
  }

  deleteNode(data?){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: '確定是否刪除？',
      nzOkText: '是',
      nzCancelText: '否',
      nzOnOk:()=>{
        this.store.dispatch(new DeleteCoding(data))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => {
          this.router.navigate(['/coding-management/codings', this.definitionId]);
          this.notifyService.success("資料更新成功");
        }, (error) => {
          this.notifyService.error("資料更新失敗");
        });
      }
    });
  }

  loadValue(lvl: number){
    let l = lvl + 2;
    if(!this.treeValue[lvl]) {
      let v = (lvl !== 0) ? this.treeValue[lvl - 1]['id'] : this.definitionId;
      this.treeValue[lvl] = [];
      if(l < this.level){
        this.treeValue[lvl + 1] = this.treeData[lvl + 1] = [];
        this.openSelect[lvl + 1] = false;
      }
      this.treeData[lvl] = _.sortBy(this.rowData.filter(x => x.parentId === v), 'no');
    } else {
        if(l < this.level){
          this.treeData[lvl + 1] = this.rowData.filter(x => x.parentId === _.sortBy(this.treeValue[lvl]['id']), 'no');
          this.openSelect[lvl + 1] = (l !== this.level) ? true : false;
        }
    }
    if(l < this.level){
        for(let i = lvl + 2; i < this.treeData.length; i++){
            this.openSelect[i] = false;
            this.treeData[i] = [];
            this.treeValue[i] = [];
        }
    }
  }

  search(){
    this.nzContextMenuService.close();
    this.data = [];
    this.nodeData = {};
    let value = [];
    this.isSeletedItem = "";
    for(let index = 0; index < this.treeValue.length; index++){
      value.push([]);
      if(this.treeValue[index]['id']){
          value[index][0] = this.treeValue[index];
          this.data = this.data.concat(this.treeValue[index]);
      } else {
          if(index === 0){
              let v = _.sortBy(this.rowData.filter(y => y.parentId === this.definitionId), 'no');
              value[index] = v;
              this.data = this.data.concat(v);
          } else {
              value[index - 1].forEach((x) => {
                  let v = (x['id']) ? _.sortBy(this.rowData.filter(y => y.parentId === x['id']), 'no') : [];
                  value[index] = value[index].concat(v);
                  this.data = this.data.concat(v);
              })
          }
      }
    }
    this.init();
  }

  onNodeClick(node){
  }

  clickItem(node){
    this.nzContextMenuService.close();
    if(this.isSeletedItem === node.key){
      this.isSeletedItem = "";
    } else {
      this.isSeletedItem = node.key;
    }
  }

  searchColor(node){
    if(!this.fsNgAlainTreeComponent || !this.fsNgAlainTreeComponent.searchValue) return node.title;
    var regStr = "";
    var extraText = "~!@#$%^&*()_+=-|\\?/.,<>'\";:[]{}";
    var searchArr = this.fsNgAlainTreeComponent.searchValue.split("");
    searchArr.forEach(x => {
      if(extraText.includes(x)){
        regStr += "\\" + x;
      }else{
        regStr += x;
      }
    });
    var reg = new RegExp(regStr);
    var addClass = "<span class='font-highlight'>" + this.fsNgAlainTreeComponent.searchValue + "</span>";
    var newTitle = node.title.replace(reg, addClass);
    return newTitle;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, node: any): void {
    this.nodeData = node;
    this.nzContextMenuService.create($event, menu);
  }

  setting(visible, providerKey){
    this.nzContextMenuService.close();
    this.parameters = {
      providerKey: providerKey,
      providerName: 'Codes',
      visible: visible,
      routerName: null
    };
  }
}
