import { PutUpdateButtedLooseLeafTestRequest } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/requests/put-update-butted-loose-leaf-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestButtedLooseLeafTestEntry } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/models/request-butted-loose-leaf-test-entry';
import { ButtedLooseLeafTestApiService } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/butted-loose-leaf-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { ButtedLooseLeafForm } from '../models/butted-loose-leaf-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-butted-loose-leaf-tests',
	templateUrl: './edit-butted-loose-leaf-tests.component.html'
})
export class EditButtedLooseLeafTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public buttedLooseLeafForm!: ButtedLooseLeafForm;
	constructor(private buttedLooseLeafTestApiService: ButtedLooseLeafTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.buttedLooseLeafTestApiService.getButtedLooseLeafById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.buttedLooseLeafForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: ButtedLooseLeafForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestButtedLooseLeafTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateButtedLooseLeafTestRequest(data);

		this.buttedLooseLeafTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Butted loose leaf test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
