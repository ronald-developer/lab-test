import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize, tap } from 'rxjs';

import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

import { NtrmInLineTestApiService } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/ntrm-in-line-test-api.service';

import { NtrmInLineDetailsForm } from '../models/ntrm-in-line-form-descriptor';
import { RequestNtrmInLineTestEntryModel } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/models/request-ntrm-in-line-test-entry-model';
import { PostCreateNtrmInLineTestRequest } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/requests/post-create-ntrm-in-line-test-request';

@Component({
	selector: 'app-create-ntrm-in-line-test',
	templateUrl: './create-ntrm-in-line-test.component.html'
})
export class CreateNtrmInLineTestsComponent extends BaseComponent implements AfterViewInit {

	public reset: boolean = false;
	constructor(
		private ntrmInLineTestApiService: NtrmInLineTestApiService,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		super();
	}
	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public save(result: NtrmInLineDetailsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmInLineTestEntryModel = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateNtrmInLineTestRequest(data);

		this.ntrmInLineTestApiService.create(request).pipe(tap(() => {
			this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
			this.reset = true;
			this.toastr.success('Ntrm in-line test created', 'Success!');
			this.detector.detectChanges();
		}), this.endLoading(), finalize(() => this.reset = false)).subscribe();
	}
}
