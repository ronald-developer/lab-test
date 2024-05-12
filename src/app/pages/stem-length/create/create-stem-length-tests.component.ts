
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StemLengthForm } from '../models/stem-length-form-descriptor';
import { RequestStemLengthEntry } from './../../../api-services/lab-tests/stem-length-test-api/models/request-stem-length-entry';
import { PostCreateStemLengthTestRequest } from './../../../api-services/lab-tests/stem-length-test-api/requests/post-create-stem-length-test-request';
import { StemLengthTestApiService } from './../../../api-services/lab-tests/stem-length-test-api/stem-length-test-api.service';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
	selector: 'app-create-stem-length-tests',
	templateUrl: './create-stem-length-tests.component.html'
})
export class CreateStemLengthTestsComponent extends BaseComponent implements OnInit {
	public reset: boolean = false;
	constructor(private stemLengthTestApiService: StemLengthTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
	}

	public save(result: StemLengthForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemLengthEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateStemLengthTestRequest(data);

		this.stemLengthTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Stem length test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
