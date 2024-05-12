import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DegsTestApiService } from 'src/app/api-services/lab-tests/degs-test-api/degs-test-api.service';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { DegsForm } from '../models/degs-form-descriptor';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RequestDegsTestEntry } from 'src/app/api-services/lab-tests/degs-test-api/models/request-degs-test-entry';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { PostCreateDegsTestRequest } from 'src/app/api-services/lab-tests/degs-test-api/requests/post-create-degs-test-request';
import { tap } from 'rxjs/operators';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
	selector: 'app-create-degs-tests',
	templateUrl: './create-degs-tests.component.html'
})
export class CreateDegsTestsComponent extends BaseComponent implements OnInit {

	constructor(private degsTestApiService: DegsTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: DegsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestDegsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateDegsTestRequest(data);
		this.degsTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Degs test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
