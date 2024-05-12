import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { MoistureAndTempTestForm } from '../models/moisture-and-temp-form-descriptor';
import { RequestMoistureAndTempTestEntryModel } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/models/request-moisture-and-temp-test-entry-model';
import { MoistureAndTempTestApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/moisture-and-temp-test-api.service';
import { PutUpdateMoistureAndTempTestRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/requests/put-update-moisture-and-temp-test-request';

@Component({
	selector: 'app-edit-moisture-and-temp-tests',
	templateUrl: './edit-moisture-and-temp-tests.component.html'
})
export class EditMoistureAndTempTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public operationOrderId: number;
	public moistureAndTempTestForm!: MoistureAndTempTestForm;
	constructor(private moistureAndTempTestApiService: MoistureAndTempTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.moistureAndTempTestApiService.getMoistureAndTempById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.moistureAndTempTestForm = { ...response,
					entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: MoistureAndTempTestForm) {
		this.loading(true);
		const data: RequestMoistureAndTempTestEntryModel = {
			...result
		}

		const request = new PutUpdateMoistureAndTempTestRequest(data);

		this.moistureAndTempTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Moisture and temp test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}

