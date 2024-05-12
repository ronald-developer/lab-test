import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestTipsTestEntry } from 'src/app/api-services/lab-tests/tips-test-api/models/request-tips-test-entry';
import { PostCreateTipsTestRequest } from 'src/app/api-services/lab-tests/tips-test-api/requests/post-create-tips-test-request';
import { TipsTestApiService } from 'src/app/api-services/lab-tests/tips-test-api/tips-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { TipsForm } from '../models/tips-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
  selector: 'app-create-tips-tests',
  templateUrl: './create-tips-tests.component.html'
})
export class CreateTipsTestsComponent extends BaseComponent implements OnInit {

	constructor(private tipsTestApiService: TipsTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: TipsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestTipsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateTipsTestRequest(data);
		this.tipsTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Tips test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
