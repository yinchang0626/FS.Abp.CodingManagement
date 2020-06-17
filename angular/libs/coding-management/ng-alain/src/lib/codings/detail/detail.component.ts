import { Component, OnInit, Input, TemplateRef, ViewChild, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
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
import { GetChildrenByNos, ThemeCoreState, CodingsByDefinitionModel } from '@fs/theme.core';

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

  editedDta = {};
  rawData = null;
  treeData = null;
  loading: boolean = false;
  seletedNode: string = "";
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private notifyService: NotifyService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
   this.data$.subscribe(x => {
    if(x) {
      let value = _.sortBy(x.rawDatas[this.selectedDefinition.codes.no], function(o) { return o.codes.no; });

      value.map(y => {
        let splitName = y.availableSettingsDefinitions.map(z => {
          let name = z.name.split('.', 2);
          return _.join(name, '.');
        });
        y.codes.config.includeSettingsGroups = _.uniq(splitName);
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
    this.form = new FormGroup({});
    this.rawData = null;
    this.treeData = null;
    this.editedDta = {};
    this.seletedNode = "";
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
    this.rawData.forEach((x, i) => {
      data[x.codes.id] = this.fb.group({
        no: [x.codes.no, [Validators.required]],
        name: [x.codes.displayName, [Validators.required]],
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
      let name = data.name;
      let description = data.description;
      let enable = data.enable;
      let configSetting = data.configSetting;
      let isEdit = (rawData.codes.no !== no ||
                    rawData.codes.displayName !== name ||
                    rawData.codes.description !== description ||
                    rawData.codes.enable !== enable ||
                    this.compare(rawData.codes.config.includeSettingsGroups, configSetting));
      if(isEdit) this.editedDta[key] = true; else delete this.editedDta[key];
      this.changeDetectorRef.detectChanges();
    });
  }

  compare(rawData, data){
    if(rawData.length != data.length) return true;
    data.forEach(x => {
      let check = _.indexOf(rawData, x);
      if(check === -1){
        return true;
      }
    });
    return false;
  }

  save() {
   
  }

  deleteNode(id?) {
    
  }

  search() {

  }

  loadData() {

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
}
