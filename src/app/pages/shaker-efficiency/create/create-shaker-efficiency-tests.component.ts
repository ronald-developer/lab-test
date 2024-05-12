import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { PostCreateShakerEfficiencyTestRequest } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/requests/post-create-shaker-efficiency-test-request';
import { RequestShakerEfficiencyTestEntry } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/models/request-shaker-efficiency-test-entry';
import { ShakerEfficiencyForm } from '../models/shaker-efficiency-form-descriptor';
import { ShakerEfficiencyTestApiService } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/shaker-efficiency-test-api.service';

@Component({
  selector: 'app-create-shaker-efficiency-tests',
  templateUrl: './create-shaker-efficiency-tests.component.html'
})
export class CreateShakerEfficiencyTestsComponent extends BaseComponent implements OnInit {

	constructor(private shakerEfficiencyTestApiService: ShakerEfficiencyTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: ShakerEfficiencyForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestShakerEfficiencyTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateShakerEfficiencyTestRequest(data);
		this.shakerEfficiencyTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Shaker efficiency test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
