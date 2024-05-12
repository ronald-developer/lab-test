import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestInlineDataTestEntry } from '../../../api-services/lab-tests/inline-data-test-api/models/request-inline-data-test-entry';
import { PostCreateInlineDataTestRequest } from '../../../api-services/lab-tests/inline-data-test-api/requests/post-create-inline-data-test-request';
import { InlineDataTestApiService } from '../../../api-services/lab-tests/inline-data-test-api/inline-data-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { InlineDataForm } from '../models/inline-data-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
	selector: 'app-create-inline-data-tests',
	templateUrl: './create-inline-data-tests.component.html'
})
export class CreateInlineDataTestsComponent extends BaseComponent implements OnInit {

	constructor(private inlineDataTestApiService: InlineDataTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: InlineDataForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestInlineDataTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateInlineDataTestRequest(data);
		this.inlineDataTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Inline data test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
