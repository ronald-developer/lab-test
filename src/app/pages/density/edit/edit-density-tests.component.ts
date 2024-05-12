import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DensityTestApiService } from 'src/app/api-services/lab-tests/density-test-api/density-test-api.service';
import { RequestDensityTestEntry } from 'src/app/api-services/lab-tests/density-test-api/models/request-density-test-entry';
import { PutUpdateDensityTestRequest } from 'src/app/api-services/lab-tests/density-test-api/requests/put-update-density-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { DensityForm } from '../models/density-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-edit-density-tests',
	templateUrl: './edit-density-tests.component.html'
})
export class EditDensityTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public densityForm!: DensityForm;
	constructor(private densityTestApiService: DensityTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.densityTestApiService.getDensityById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.densityForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: DensityForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestDensityTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateDensityTestRequest(data);

		this.densityTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Density test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
