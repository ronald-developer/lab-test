import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestInlineHsTestEntry } from '../../../api-services/lab-tests/inline-hs-test-api/models/request-inline-hs-test-entry';
import { PostCreateInlineHsTestRequest } from '../../../api-services/lab-tests/inline-hs-test-api/requests/post-create-inline-hs-test-request';
import { InlineHsTestApiService } from '../../../api-services/lab-tests/inline-hs-test-api/inline-hs-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { InlineHsForm } from '../models/inline-hs-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
  selector: 'app-create-inline-hs-tests',
  templateUrl: './create-inline-hs-tests.component.html'
})
export class CreateInlineHsTestsComponent extends BaseComponent implements OnInit {

	constructor(private inlineHsTestApiService: InlineHsTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: InlineHsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestInlineHsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateInlineHsTestRequest(data);
		this.inlineHsTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('InlineHs test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
