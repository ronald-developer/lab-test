import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from './../../../shared/components/base/base.component';
import { tap } from 'rxjs/operators';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { ShakerEfficiencyTestApiService } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/shaker-efficiency-test-api.service';
import { ShakerEfficiencyForm } from '../models/shaker-efficiency-form-descriptor';
import { RequestShakerEfficiencyTestEntry } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/models/request-shaker-efficiency-test-entry';
import { PutUpdateShakerEfficiencyTestRequest } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/requests/put-update-shaker-efficiency-test-request';

@Component({
	selector: 'app-edit-shaker-efficiency-tests',
	templateUrl: './edit-shaker-efficiency-tests.component.html'
})
export class EditShakerEfficiencyTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public shakerEfficiencyForm!: ShakerEfficiencyForm;
	constructor(private shakerEfficiencyTestApiService: ShakerEfficiencyTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.shakerEfficiencyTestApiService.getShakerEfficiencyById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.shakerEfficiencyForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: ShakerEfficiencyForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestShakerEfficiencyTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateShakerEfficiencyTestRequest(data);

		this.shakerEfficiencyTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Shaker efficiency test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
