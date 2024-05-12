import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestSandTestEntry } from 'src/app/api-services/lab-tests/sand-test-api/models/request-sand-test-entry';
import { PutUpdateSandTestRequest } from 'src/app/api-services/lab-tests/sand-test-api/requests/put-update-sand-test-request';
import { SandTestApiService } from 'src/app/api-services/lab-tests/sand-test-api/sand-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { SandForm } from '../models/sand-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';

@Component({
	selector: 'app-edit-sand-tests',
	templateUrl: './edit-sand-tests.component.html'
})
export class EditSandTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public sandForm!: SandForm;
	constructor(private sandTestApiService: SandTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.sandTestApiService.getSandById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.sandForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: SandForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestSandTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateSandTestRequest(data);

		this.sandTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Sand test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}

