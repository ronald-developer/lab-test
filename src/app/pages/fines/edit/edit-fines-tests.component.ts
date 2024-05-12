import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { FinesTestApiService } from 'src/app/api-services/lab-tests/fines-test-api/fines-test-api.service';
import { RequestFinesTestEntry } from 'src/app/api-services/lab-tests/fines-test-api/models/request-fines-test-entry';
import { PutUpdateFinesTestRequest } from 'src/app/api-services/lab-tests/fines-test-api/requests/put-update-fines-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { FinesForm } from '../models/fines-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';

@Component({
	selector: 'app-edit-fines-tests',
	templateUrl: './edit-fines-tests.component.html'
})
export class EditFinesTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public finesForm!: FinesForm;
	constructor(private finesTestApiService: FinesTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.finesTestApiService.getFinesById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.finesForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: FinesForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestFinesTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateFinesTestRequest(data);

		this.finesTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Fines test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
