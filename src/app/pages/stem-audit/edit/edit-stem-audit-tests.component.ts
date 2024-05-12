import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { StemAuditTestApiService } from 'src/app/api-services/lab-tests/stem-audit-test-api/stem-audit-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { StemAuditForm } from '../models/stem-audit-form-descriptor';
import { RequestStemAuditTestEntry } from 'src/app/api-services/lab-tests/stem-audit-test-api/models/request-stem-audit-test-entry';
import { PutUpdateStemAuditTestRequest } from 'src/app/api-services/lab-tests/stem-audit-test-api/requests/put-update-stem-audit-test-request';

@Component({
	selector: 'app-edit-stem-audit-tests',
	templateUrl: './edit-stem-audit-tests.component.html'
})
export class EditStemAuditTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public stemAuditForm!: StemAuditForm;
	constructor(private stemAuditTestApiService: StemAuditTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.stemAuditTestApiService.getStemAuditById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.stemAuditForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: StemAuditForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemAuditTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateStemAuditTestRequest(data);

		this.stemAuditTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Stem audit test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
