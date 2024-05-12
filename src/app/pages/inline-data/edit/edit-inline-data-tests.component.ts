import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InlineDataTestApiService } from './../../../api-services/lab-tests/inline-data-test-api/inline-data-test-api.service';
import { BaseComponent } from './../../../shared/components/base/base.component';
import { InlineDataForm } from '../models/inline-data-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { tap } from 'rxjs/operators';
import { RequestInlineDataTestEntry } from './../../../api-services/lab-tests/inline-data-test-api/models/request-inline-data-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { PutUpdateInlineDataTestRequest } from './../../../api-services/lab-tests/inline-data-test-api/requests/put-update-inline-data-test-request';

@Component({
	selector: 'app-edit-inline-data-tests',
	templateUrl: './edit-inline-data-tests.component.html'
})
export class EditInlineDataTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public inlineDataForm!: InlineDataForm;
	constructor(private inlineDataTestApiService: InlineDataTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.inlineDataTestApiService.getInlineDataById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.inlineDataForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: InlineDataForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestInlineDataTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateInlineDataTestRequest(data);

		this.inlineDataTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Inline data test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
