import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '@fs/ng-alain/shared';
import { PatchCodeSettingsByInputs } from '../providers/codings.actions';

@Component({
    selector: 'fs-edit-code',
    templateUrl: './edit-code.component.html',
    styleUrls: ['./edit-code.component.less']
  })
  export class EditCodeComponent implements OnInit {
    @Input()
    type: string = null;

    @Input()
    data = null;

    @Input()
    settingGroups = null;

    @Input()
    parentId: string = null;

    @Input()
    definitionId: string = null;

    tplModal: NzModalRef;
    form: FormGroup;
    loading: boolean = false;
    constructor(
        private modalService: NzModalService,
        private store: Store,
        private fb: FormBuilder,
        private router: Router,
        private notifyService: NotifyService,
        private activatedRoute:ActivatedRoute
    ) {}

    ngOnInit(): void {
    }

    createModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
        this.tplModal = this.modalService.create({
            nzTitle: tplTitle,
            nzContent: tplContent,
            nzFooter: tplFooter,
            nzMaskClosable: false,
            nzClosable: false,
            nzWidth: 920
        });
        this.buildForm();
    }

    buildForm() {
        if(this.type === 'EditDefinition') {
        } else {
            this.data = {};
            this.data['codes'] = {};
            this.data['codes']['config'] = {};
            this.data['codes']['id'] = this.data['codes']['code'] = null;
            this.data['codes']['displayName'] = this.data['codes']['no'] = this.data['codes']['description'] = '';
            this.data['codes']['enable'] = true;
            this.data['codes']['config']['includeSettingsGroups'] = [];
        }

        this.form = this.fb.group({
            no: [this.data['codes']['no'], [Validators.required]],
            displayName: [this.data['codes']['displayName'], [Validators.required]],
            enable: [this.data['codes']['enable'], [Validators.required]],
            description: [this.data['codes']['description'], []],
            configSetting: [this.data['codes']['config']['includeSettingsGroups'], []],
        });
    }

    save() {
        let data = {
            editItems: [
                {
                    "settings": [],
                    "no": this.form.value.no,
                    "displayName": this.form.value.displayName,
                    "description": this.form.value.description,
                    "definitionId": this.definitionId,
                    "parentId": this.parentId,
                    "enable": this.form.value.enable,
                    "config": {
                        "excludeSettingsGroups": [],
                        "includeSettingsGroups": this.form.value.configSetting
                    }
                }
            ],
            deleteItemIds: []
        };

        if(this.data['codes']['id']) {
            data.editItems[0]['id'] =  this.data['codes']['id'];
            data.editItems[0]['code'] =  this.data['codes']['code'];
        }

        this.store.dispatch(
            new PatchCodeSettingsByInputs(data)
        )
        .pipe(finalize(() => this.loading = false))
        .subscribe((x) => {
            this.tplModal.destroy();
            this.notifyService.success("資料更新成功");
        }, (error) => {
            this.notifyService.error("資料更新失敗");
        });
    }

    close(): void {
        this.tplModal.destroy();
    }
  }