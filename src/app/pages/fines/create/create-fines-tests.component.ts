import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FinesTestApiService } from 'src/app/api-services/lab-tests/fines-test-api/fines-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { FinesForm } from '../models/fines-form-descriptor';
import { RequestFinesTestEntry } from 'src/app/api-services/lab-tests/fines-test-api/models/request-fines-test-entry';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { PostCreateFinesTestRequest } from 'src/app/api-services/lab-tests/fines-test-api/requests/post-create-fines-test-request';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { tap } from 'rxjs';

@Component({
	selector: 'app-create-fines-tests',
	templateUrl: './create-fines-tests.component.html'
})
export class CreateFinesTestsComponent extends BaseComponent implements OnInit {

	constructor(private finesTestApiService: FinesTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}

	public reset: boolean = false;
	public save(result: FinesForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestFinesTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateFinesTestRequest(data);
		this.finesTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Fines test created', 'Success!');
				this.detector.detectChanges();
			}), this.endLoading()).subscribe();
	}
}

