import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BundleBusterTestApiService } from './../../../api-services/lab-tests/bundle-buster-test-api/bundle-buster-test-api.service';
import { BaseComponent } from './../../../shared/components/base/base.component';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { tap } from 'rxjs/operators';
import { RequestBundleBusterTestEntry } from './../../../api-services/lab-tests/bundle-buster-test-api/models/request-bundle-buster-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { PutUpdateBundleBusterTestRequest } from './../../../api-services/lab-tests/bundle-buster-test-api/requests/put-update-bundle-buster-test-request';
import { BundleBusterForm } from '../models/bundle-buster-form-descriptor';

@Component({
	selector: 'app-edit-bundle-buster-tests',
	templateUrl: './edit-bundle-buster-tests.component.html'
})
export class EditBundleBusterTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public bundleBusterForm!: BundleBusterForm;
	constructor(private bundleBusterTestApiService: BundleBusterTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.bundleBusterTestApiService.getById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.bundleBusterForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: BundleBusterForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestBundleBusterTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateBundleBusterTestRequest(data);

		this.bundleBusterTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Bundle buster test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
