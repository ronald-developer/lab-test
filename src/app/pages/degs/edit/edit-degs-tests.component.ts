import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DegsForm } from '../models/degs-form-descriptor';
import { DegsTestApiService } from 'src/app/api-services/lab-tests/degs-test-api/degs-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { RequestDegsTestEntry } from 'src/app/api-services/lab-tests/degs-test-api/models/request-degs-test-entry';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { PutUpdateDegsTestRequest } from 'src/app/api-services/lab-tests/degs-test-api/requests/put-update-degs-test-request';

@Component({
	selector: 'app-edit-degs-tests',
	templateUrl: './edit-degs-tests.component.html'
})
export class EditDegsTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public degsForm!: DegsForm;
	constructor(private degsTestApiService: DegsTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.degsTestApiService.getDegsById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.degsForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: DegsForm) {
		const entryDate = result.entryDate as Date;
		this.loading(true);
		const entryTime = result.entryTime as Date;
		const data: RequestDegsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateDegsTestRequest(data);

		this.degsTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Degs test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
