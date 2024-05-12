import { PutUpdateLeavesTestRequest } from './../../../api-services/lab-tests/leaves-test-api/requests/put-update-leaves-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestLeavesTestEntry } from './../../../api-services/lab-tests/leaves-test-api/models/request-leaves-test-entry';
import { LeavesTestApiService } from './../../../api-services/lab-tests/leaves-test-api/leaves-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { LeavesForm } from '../models/leaves-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-leaves-tests',
	templateUrl: './edit-leaves-tests.component.html'
})
export class EditLeavesTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public leavesForm!: LeavesForm;
	constructor(private leavesTestApiService: LeavesTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.leavesTestApiService.getLeavesById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.leavesForm = { ...response, entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: LeavesForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const data: RequestLeavesTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate)
		}
		const request = new PutUpdateLeavesTestRequest(data);

		this.leavesTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Leaves test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
