import { PutUpdateShortStemTestRequest } from './../../../api-services/lab-tests/short-stem-test-api/requests/put-update-short-stem-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestShortStemTestEntry } from './../../../api-services/lab-tests/short-stem-test-api/models/request-short-stem-test-entry';
import { ShortStemTestApiService } from './../../../api-services/lab-tests/short-stem-test-api/short-stem-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { ShortStemForm } from '../models/short-stem-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-short-stem-tests',
	templateUrl: './edit-short-stem-tests.component.html'
})
export class EditShortStemTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public shortStemForm!: ShortStemForm;
	constructor(private shortStemTestApiService: ShortStemTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.shortStemTestApiService.getShortStemById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.shortStemForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: ShortStemForm) {
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestShortStemTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateShortStemTestRequest(data);

		this.shortStemTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Short stem test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
