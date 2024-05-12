import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestNtrmProductTestEntry } from 'src/app/api-services/lab-tests/ntrm-product-test-api/models/request-ntrm-product-test-entry';
import { NtrmProductTestApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-api/ntrm-product-test-api.service';
import { PostCreateNtrmProductTestRequest } from 'src/app/api-services/lab-tests/ntrm-product-test-api/requests/post-create-ntrm-product-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { NtrmProductForm } from '../models/ntrm-product-form-descriptor';

@Component({
	selector: 'app-create-ntrm-product-test',
	templateUrl: './create-ntrm-product-test.component.html'
})
export class CreateNtrmProductTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public operationOrderId: number;
	public reset: boolean = false;
	constructor(
		private ntrmProductTestApiService: NtrmProductTestApiService,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider) {
		super();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public save(result: NtrmProductForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmProductTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PostCreateNtrmProductTestRequest(data);

		this.ntrmProductTestApiService.create(request).pipe(tap(() => {
			this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
			this.reset = true;
			this.toastr.success('Ntrm product test created', 'Success!');
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

}
