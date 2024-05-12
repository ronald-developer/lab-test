import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PostCreateLooseLeafTestRequest } from 'src/app/api-services/lab-tests/loose-leaf-test-api/requests/post-create-loose-leaf-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LooseLeafTestApiService } from './../../../api-services/lab-tests/loose-leaf-test-api/loose-leaf-test-api.service';
import { RequestLooseLeafTestEntry } from './../../../api-services/lab-tests/loose-leaf-test-api/models/request-loose-leaf-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { LooseLeafForm } from './../models/loose-leaf-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
	selector: 'app-create-loose-leaf-tests',
	templateUrl: './create-loose-leaf-tests.component.html'
})
export class CreateLooseLeafTestsComponent extends BaseComponent implements OnInit {

	constructor(private LooseLeafTestApiService: LooseLeafTestApiService,
		private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: LooseLeafForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestLooseLeafTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}

		const request = new PostCreateLooseLeafTestRequest(data);
		this.LooseLeafTestApiService.create(request).pipe(
			tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Loose leaf test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}
