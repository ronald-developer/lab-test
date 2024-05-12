import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PostCreateLeavesTestRequest } from 'src/app/api-services/lab-tests/leaves-test-api/requests/post-create-leaves-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LeavesTestApiService } from './../../../api-services/lab-tests/leaves-test-api/leaves-test-api.service';
import { RequestLeavesTestEntry } from './../../../api-services/lab-tests/leaves-test-api/models/request-leaves-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { LeavesForm } from './../models/leaves-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
	selector: 'app-create-leaves-tests',
	templateUrl: './create-leaves-tests.component.html'
})
export class CreateLeavesTestsComponent extends BaseComponent implements OnInit {

	constructor(private leavesTestApiService: LeavesTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: LeavesForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const data: RequestLeavesTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate)
		}

		const request = new PostCreateLeavesTestRequest(data);
		this.leavesTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Leaves test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
