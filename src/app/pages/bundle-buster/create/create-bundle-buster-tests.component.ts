import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestBundleBusterTestEntry } from 'src/app/api-services/lab-tests/bundle-buster-test-api/models/request-bundle-buster-test-entry';
import { PostCreateBundleBusterTestRequest } from 'src/app/api-services/lab-tests/bundle-buster-test-api/requests/post-create-bundle-buster-test-request';
import { BundleBusterTestApiService } from 'src/app/api-services/lab-tests/bundle-buster-test-api/bundle-buster-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { BundleBusterForm } from '../models/bundle-buster-form-descriptor';

@Component({
  selector: 'app-create-bundle-buster-tests',
  templateUrl: './create-bundle-buster-tests.component.html'
})
export class CreateBundleBusterTestsComponent extends BaseComponent implements OnInit {

	constructor(private bundleBusterTestApiService: BundleBusterTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: BundleBusterForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestBundleBusterTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateBundleBusterTestRequest(data);
		this.bundleBusterTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Bundle buster test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
