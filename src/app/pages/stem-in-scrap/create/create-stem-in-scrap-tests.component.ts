import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RequestStemInScrapTestEntry } from './../../../api-services/lab-tests/stem-in-scrap-test-api/models/request-stem-in-scrap-test-entry';
import { PostCreateStemInScrapTestRequest } from './../../../api-services/lab-tests/stem-in-scrap-test-api/requests/post-create-stem-in-scrap-test-request';
import { StemInScrapTestApiService } from './../../../api-services/lab-tests/stem-in-scrap-test-api/stem-in-scrap-test-api.service';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { StemInScrapForm } from './../models/stem-in-scrap-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
	selector: 'app-create-stem-in-scrap-tests',
	templateUrl: './create-stem-in-scrap-tests.component.html'
})
export class CreateStemInScrapTestsComponent extends BaseComponent implements OnInit {

	constructor(private stemInScrapTestApiService: StemInScrapTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}

	public reset: boolean = false;
	public save(result: StemInScrapForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemInScrapTestEntry = {
			...result,
			entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateStemInScrapTestRequest(data);
		this.stemInScrapTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Stem in scrap test created', 'Success!');
				this.detector.detectChanges();
			}), this.endLoading()).subscribe();
	}
}

