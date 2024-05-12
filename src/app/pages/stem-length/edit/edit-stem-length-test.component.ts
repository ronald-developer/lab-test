import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PutUpdateStemLengthTestRequest } from './../../../api-services/lab-tests/stem-length-test-api/requests/put-update-stem-length-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestStemLengthEntry } from './../../../api-services/lab-tests/stem-length-test-api/models/request-stem-length-entry';
import { StemLengthTestApiService } from './../../../api-services/lab-tests/stem-length-test-api/stem-length-test-api.service';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { StemLengthForm } from '../models/stem-length-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-stem-length-test',
	templateUrl: './edit-stem-length-test.component.html'
})
export class EditStemLengthTestComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public stemLengthForm!: StemLengthForm;
	constructor(private stemLengthTestApiService: StemLengthTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.stemLengthTestApiService.getStemLengthById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.stemLengthForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: StemLengthForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemLengthEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateStemLengthTestRequest(data);

		this.stemLengthTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Stem length test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
