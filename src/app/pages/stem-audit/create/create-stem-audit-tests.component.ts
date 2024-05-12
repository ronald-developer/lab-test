import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { StemAuditTestApiService } from 'src/app/api-services/lab-tests/stem-audit-test-api/stem-audit-test-api.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { RequestStemAuditTestEntry } from 'src/app/api-services/lab-tests/stem-audit-test-api/models/request-stem-audit-test-entry';
import { PostCreateStemAuditTestRequest } from 'src/app/api-services/lab-tests/stem-audit-test-api/requests/post-create-stem-audit-test-request';
import { StemAuditForm } from '../models/stem-audit-form-descriptor';

@Component({
	selector: 'app-create-stem-audit-tests',
	templateUrl: './create-stem-audit-tests.component.html'
})
export class CreateStemAuditTestsComponent extends BaseComponent implements OnInit {

	constructor(private stemAuditTestApiService: StemAuditTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit(): void {
	}
	public reset: boolean = false;
	public save(result: StemAuditForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemAuditTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateStemAuditTestRequest(data);
		this.stemAuditTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Stem audit test created', 'Success!');
				this.detector.detectChanges();
			}),
			this.endLoading()).subscribe();
	}
}

