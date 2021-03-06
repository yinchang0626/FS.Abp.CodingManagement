import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifyService } from '../../shared/services/notify/notify.service';
import { CreateCoding, UpdateCoding } from '../providers/codings.actions';
import { CodingManagementDtos } from '@fs/coding-management';

@Component({
    selector: 'fs-edit-code',
    templateUrl: './edit-code.component.html',
    styleUrls: ['./edit-code.component.less']
  })
  export class EditCodeComponent implements OnInit {
    @Input()
    item = null;

    @Input()
    parentId: string = null;

    @Input()
    definitionId: string = null;

    tplModal: NzModalRef;
    form: FormGroup;
    pageQuery: CodingManagementDtos.codingsPageQueryParams = { skipCount: 0, maxResultCount: 999 } as CodingManagementDtos.codingsPageQueryParams;
    loading: boolean = false;
    constructor(
        private modalService: NzModalService,
        private store: Store,
        private fb: FormBuilder,
        private router: Router,
        private notifyService: NotifyService
    ) {}

    ngOnInit(): void {
    }

    createModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
        this.tplModal = this.modalService.create({
            nzTitle: tplTitle,
            nzContent: tplContent,
            nzFooter: tplFooter,
            nzMaskClosable: false,
            nzClosable: false
        });
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            no: [(this.item) ? this.item['no'] : '', [Validators.required]],
            name: [(this.item) ? this.item['displayName'] : '', [Validators.required]],
            description: [(this.item) ? this.item['description'] : '', []]
        });
    }

    save() {
        let data = {
            "id": (this.item) ? this.item['id'] : null,
            "no": this.form.value.no,
            "displayName": this.form.value.name,
            "description": this.form.value.description,
            "definitionId": (this.definitionId) ? this.definitionId : null,
            "code": (this.item) ? this.item['code'] : null,
            "parentId": (this.parentId) ? this.parentId : null
        };
        this.store.dispatch(
            (this.item) ? new UpdateCoding(data) : new CreateCoding(data)
        )
        .pipe(finalize(() => this.loading = false))
        .subscribe((x) => {
            this.tplModal.destroy();
            (this.definitionId) ? this.router.navigate(['/coding-management/codings', this.definitionId]) : this.router.navigate(['/coding-management/codings'])
            this.notifyService.success("資料更新成功");
        }, (error) => {
            this.notifyService.error("資料更新失敗");
        });
    }

    close(): void {
        this.tplModal.destroy();
    }
  }