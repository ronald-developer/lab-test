import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NtrmProductTestApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-api/ntrm-product-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { NtrmProductForm } from '../models/ntrm-product-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { PutUpdateNtrmProductTestRequest } from 'src/app/api-services/lab-tests/ntrm-product-test-api/requests/put-update-ntrm-product-test-request';
import { RequestNtrmProductTestEntry } from 'src/app/api-services/lab-tests/ntrm-product-test-api/models/request-ntrm-product-test-entry';


@Component({
	selector: 'app-edit-ntrm-product-tests',
	templateUrl: './edit-ntrm-product-tests.component.html'
})
export class EditNtrmProductTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public ntrmProductForm!: NtrmProductForm;
	constructor(private ntrmProductTestApiService: NtrmProductTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.ntrmProductTestApiService.getNtrmProductById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.ntrmProductForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: NtrmProductForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestNtrmProductTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateNtrmProductTestRequest(data);

		this.ntrmProductTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Ntrm product test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
