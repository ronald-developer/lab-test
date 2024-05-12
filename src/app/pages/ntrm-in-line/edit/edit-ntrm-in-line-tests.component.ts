import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { NtrmInLineDetailsForm } from '../models/ntrm-in-line-form-descriptor';
import { NtrmInLineTestApiService } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/ntrm-in-line-test-api.service';
import { RequestNtrmInLineTestEntryModel } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/models/request-ntrm-in-line-test-entry-model';
import { PutUpdateNtrmInLineTestRequest } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/requests/put-update-ntrm-in-line-test-request';

@Component({
	selector: 'app-edit-ntrm-in-line-tests',
	templateUrl: './edit-ntrm-in-line-tests.component.html'
})
export class EditNtrmInLineTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public ntrmInLineForm!: NtrmInLineDetailsForm;
	constructor(private ntrmInLineTestApiService: NtrmInLineTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.ntrmInLineTestApiService.getById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.ntrmInLineForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: NtrmInLineDetailsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmInLineTestEntryModel = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateNtrmInLineTestRequest(data);

		this.ntrmInLineTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Ntrm in-line batch test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
