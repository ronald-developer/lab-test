import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestNtrmGreenTestEntry } from 'src/app/api-services/lab-tests/ntrm-green-test-api/models/request-ntrm-green-test-entry';
import { PostCreateNtrmGreenTestRequest } from 'src/app/api-services/lab-tests/ntrm-green-test-api/requests/post-create-ntrm-green-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { NtrmGreenForm } from '../models/ntrm-green-form-descriptor';
import { NtrmGreenTestApiService } from 'src/app/api-services/lab-tests/ntrm-green-test-api/ntrm-green-test-api.service';

@Component({
	selector: 'app-create-ntrm-green-tests',
	templateUrl: './create-ntrm-green-tests.component.html'
})
export class CreateNtrmGreenTestsComponent extends BaseComponent implements OnInit {

	constructor(private ntrmGreenTestApiService: NtrmGreenTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: NtrmGreenForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmGreenTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateNtrmGreenTestRequest(data);
		this.ntrmGreenTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Ntrm green test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
