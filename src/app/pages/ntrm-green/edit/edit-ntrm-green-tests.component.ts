import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestNtrmGreenTestEntry } from 'src/app/api-services/lab-tests/ntrm-green-test-api/models/request-ntrm-green-test-entry';
import { NtrmGreenTestApiService } from 'src/app/api-services/lab-tests/ntrm-green-test-api/ntrm-green-test-api.service';
import { PutUpdateNtrmGreenTestRequest } from 'src/app/api-services/lab-tests/ntrm-green-test-api/requests/put-update-ntrm-green-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { NtrmGreenForm } from '../models/ntrm-green-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';

@Component({
	selector: 'app-edit-ntrm-green-tests',
	templateUrl: './edit-ntrm-green-tests.component.html'
})
export class EditNtrmGreenTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public ntrmGreenForm!: NtrmGreenForm;
	constructor(private ntrmGreenTestApiService: NtrmGreenTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.ntrmGreenTestApiService.getNtrmGreenById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.ntrmGreenForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: NtrmGreenForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmGreenTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateNtrmGreenTestRequest(data);

		this.ntrmGreenTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Ntrm green test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
