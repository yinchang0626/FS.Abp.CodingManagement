import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { NotifyService } from '@fs/ng-alain/shared';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FsNgAlainTreeComponent } from '@fs/ng-alain/basic';
import { GetChildrenByNos, ThemeCoreState, CodingsByDefinitionModel, CodingWithSettingsDto } from '@fs/theme.core';
import { PatchCodeSettingsByInputs } from '@fs/coding-management';

@Component({
  selector: 'fs-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  @ViewChild(FsNgAlainTreeComponent, {static: false}) fsNgAlainTreeComponent: FsNgAlainTreeComponent;

  @Select(ThemeCoreState.getAllChildren)
  data$: Observable<CodingsByDefinitionModel>;

  form: FormGroup;

  @Input()
  selectedDefinition = null;
  
  @Input()
  settingGroups = null;

  editedData = {};
  rawData = null;
  treeData = null;
  seletedNode: string = "";
  selectedSetting: CodingWithSettingsDto = null;
  loading: boolean = false;
  isExpanded: boolean = true;
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
      this.selectedSetting = null;
      this.ngOnChanges();
      this._visible = false;
    }
  }
  
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
   this.data$.subscribe(x => {
    this.form = new FormGroup({});
    this.rawData = null;
    this.treeData = null;
    this.seletedNode = "";
    this.isExpanded = true;
    if(x) {
      let value = _.sortBy(x.rawDatas[this.selectedDefinition.codes.no], function(o) { return o.codes.no; });
      value.map(y => {
        let result = this.settingGroups.map((z) => {
          return y.availableSettingsDefinitions.filter(v => _.startsWith(v.name, z)).length > 0 ? z : null;
        }).filter(z => z != null);
        y.codes.config.includeSettingsGroups = result;
        return y;
      });
      this.rawData = value;
      this.treeData = value.map(y => y.codes);
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

  ngOnChanges() {
    this.loading = true;
    let input = {
      "definitionNos": [
        this.selectedDefinition.codes.no
      ]
    }
    this.store
      .dispatch(new GetChildrenByNos(input))
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((x) => {},
      (error) => {
        this.notifyService.error('查詢失敗');
      });
  }

  buildForm() {
    let data = {};
    this.editedData = {};
    this.rawData.forEach((x, i) => {
      data[x.codes.id] = this.fb.group({
        no: [x.codes.no, [Validators.required]],
        displayName: [x.codes.displayName, [Validators.required]],
        enable: [x.codes.enable, [Validators.required]],
        description: [x.codes.description, []],
        configSetting: [x.codes.config.includeSettingsGroups, []],
      })
    });
    this.form = this.fb.group(data);
    this.form.valueChanges.subscribe(x => {
      let key = this.seletedNode;
      let data = x[key];
      let rawData = this.rawData.filter(y => y.codes.id === key)[0];
      let no = data.no;
      let displayName = data.displayName;
      let description = data.description;
      let enable = data.enable;
      let configSetting = data.configSetting;
      let isEdit = (rawData.codes.no !== no ||
                    rawData.codes.displayName !== displayName ||
                    rawData.codes.description !== description ||
                    rawData.codes.enable !== enable ||
                    this.compare(rawData.codes.config.includeSettingsGroups, configSetting));
      if(isEdit) this.editedData[key] = true; else delete this.editedData[key];
      this.changeDetectorRef.detectChanges();
    });
  }

  compare(rawData, data){
    if(rawData.length != data.length) return true;
    let value = _.cloneDeep(data);
    value = _.pullAll(value, rawData);
    if(value.length > 0) return true; else return false;
  }

  save() {
    this.loading = true;
    let inputList = [];
    for(let key in this.editedData) {
      if(this.form.value[key].no === '' || this.form.value[key].displayName === '') return false;
      let rawData = this.rawData.filter(x => x.codes.id === key)[0];
      let config = this.compareData(this.selectedDefinition.codes.config.includeSettingsGroups, this.form.value[key].configSetting)
      inputList.push(
        {
          "settings": [],
          "no": this.form.value[key].no,
          "displayName": this.form.value[key].displayName,
          "description": this.form.value[key].description,
          "definitionId": rawData.codes.definitionId,
          "parentId": rawData.codes.parentId,
          "enable": this.form.value[key].enable,
          "config": config,
          "id": key,
          "code": rawData.codes.code
        }
      );
    }

    let data = {
      editItems: inputList,
      deleteItemIds: [],
      definitionNos: [this.selectedDefinition.codes.no]
    };
    this.store.dispatch(
      new PatchCodeSettingsByInputs(data)
    )
    .pipe(finalize(() => this.loading = false))
    .subscribe((x) => {
        this.notifyService.success("資料更新成功");
    }, (error) => {
        this.notifyService.error("資料更新失敗");
    });
  }

  compareData(definitionGroups, childrenGroups) {
    let exclude = _.cloneDeep(definitionGroups);
    let include = _.cloneDeep(childrenGroups);
    let intersection = _.intersection(exclude, include);
    exclude = _.pullAll(exclude, intersection);
    include = _.pullAll(include, intersection);
    return {
      "excludeSettingsGroups": exclude,
      "includeSettingsGroups": include
    }
  }

  deleteNode(id?) {
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
          definitionNos: [this.selectedDefinition.codes.no]
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

  loadData() {
    this.init();
    this.buildForm();
  }

  selectNode(node?){
    if(this.seletedNode === node.key){
      this.seletedNode = "";
    } else {
      this.seletedNode = node.key;
    }
  }

  searchColor(node?){
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

  treeStatusChange(type: string, status: boolean = true){
    this.isExpanded = status;
    this.fsNgAlainTreeComponent.treeStatusChange(type, status);
  }

  setting(visible, key){
    let data = _.head(this.rawData.filter(x => x.codes.id === key));
    this.visible = visible;
    this.providerName = "Codes";
    this.providerKey = data.codes.id;
    this.selectedSetting = data;
  }
}
