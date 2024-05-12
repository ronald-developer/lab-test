import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { InlineHsTestApiService } from '../../../api-services/lab-tests/inline-hs-test-api/inline-hs-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { InlineHsForm } from '../models/inline-hs-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { RequestInlineHsTestEntry } from '../../../api-services/lab-tests/inline-hs-test-api/models/request-inline-hs-test-entry';
import { PutUpdateInlineHsTestRequest } from '../../../api-services/lab-tests/inline-hs-test-api/requests/put-update-inline-hs-test-request';

@Component({
	selector: 'app-edit-inline-hs-tests',
	templateUrl: './edit-inline-hs-tests.component.html'
})
export class EditInlineHsTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public inlineHsForm!: InlineHsForm;
	constructor(private inlineHsTestApiService: InlineHsTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.inlineHsTestApiService.getInlineHsById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.inlineHsForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: InlineHsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestInlineHsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateInlineHsTestRequest(data);

		this.inlineHsTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Inlinehs test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
