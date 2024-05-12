import { PutUpdateFlagOnStemTestRequest } from './../../../api-services/lab-tests/flag-on-stem-test-api/requests/put-update-flag-on-stem-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestFlagOnStemTestEntry } from './../../../api-services/lab-tests/flag-on-stem-test-api/models/request-flag-on-stem-test-entry';
import { FlagOnStemTestApiService } from './../../../api-services/lab-tests/flag-on-stem-test-api/flag-on-stem-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { FlagOnStemForm } from '../models/flag-on-stem-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
    selector: 'app-edit-flag-on-stem-tests',
    templateUrl: './edit-flag-on-stem-tests.component.html'
})
export class EditFlagOnStemTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
    public reset: boolean = false;
    public testId: string;
    public flagOnStemForm!: FlagOnStemForm;
    constructor(private flagOnStemTestApiService: FlagOnStemTestApiService,
        private activeModal: NgbActiveModal,
        private toastr: ToastrService,
        private detector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.loading(true);
        this.flagOnStemTestApiService.getFlagOnStemById(this.testId).pipe(
            tap(result => {
                const response = result.response.data;
                this.flagOnStemForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
            }),
            this.endLoading()).subscribe();
    }

    ngAfterViewInit(): void {
        kthelpers.MenuComponent.reinitialization();
    }

    public update(result: FlagOnStemForm) {
        const entryDate = result.entryDate as Date;
        this.loading(true);
        const entryTime = result.entryTime as Date;
        const data: RequestFlagOnStemTestEntry = {
            ...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
        }
        const request = new PutUpdateFlagOnStemTestRequest(data);

        this.flagOnStemTestApiService.update(this.testId, request).pipe(tap(() => {
            this.reset = true;
            this.toastr.success('Flag on stem test updated', 'Success!');
            this.close(true);
            this.detector.detectChanges();
        }), this.endLoading()).subscribe();
    }

    public close(isSaveChanges?: boolean) {
        this.activeModal.close(isSaveChanges);
    }
}
