import { PutUpdateLooseLeafTestRequest } from './../../../api-services/lab-tests/loose-leaf-test-api/requests/put-update-loose-leaf-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestLooseLeafTestEntry } from './../../../api-services/lab-tests/loose-leaf-test-api/models/request-loose-leaf-test-entry';
import { LooseLeafTestApiService } from './../../../api-services/lab-tests/loose-leaf-test-api/loose-leaf-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { LooseLeafForm } from '../models/loose-leaf-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-loose-leaf-tests',
	templateUrl: './edit-loose-leaf-tests.component.html'
})
export class EditLooseLeafTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public looseLeafForm!: LooseLeafForm;
	constructor(private LooseLeafTestApiService: LooseLeafTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.LooseLeafTestApiService.getLooseLeafById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.looseLeafForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: LooseLeafForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestLooseLeafTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateLooseLeafTestRequest(data);

		this.LooseLeafTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Loose leaf test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
