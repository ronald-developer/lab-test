import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PostCreateButtedLooseLeafTestRequest } from 'src/app/api-services/lab-tests/butted-loose-leaf-test-api/requests/post-create-butted-loose-leaf-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ButtedLooseLeafTestApiService } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/butted-loose-leaf-test-api.service';
import { RequestButtedLooseLeafTestEntry } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/models/request-butted-loose-leaf-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { ButtedLooseLeafForm } from './../models/butted-loose-leaf-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
	selector: 'app-create-butted-loose-leaf-tests',
	templateUrl: './create-butted-loose-leaf-tests.component.html'
})
export class CreateButtedLooseLeafTestsComponent extends BaseComponent implements OnInit {

	constructor(private buttedLooseLeafTestApiService: ButtedLooseLeafTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: ButtedLooseLeafForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestButtedLooseLeafTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateButtedLooseLeafTestRequest(data);
		this.buttedLooseLeafTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Butted loose leaf test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
