import { PutUpdateStemInScrapTestRequest } from './../../../api-services/lab-tests/stem-in-scrap-test-api/requests/put-update-stem-in-scrap-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestStemInScrapTestEntry } from './../../../api-services/lab-tests/stem-in-scrap-test-api/models/request-stem-in-scrap-test-entry';
import { StemInScrapTestApiService } from './../../../api-services/lab-tests/stem-in-scrap-test-api/stem-in-scrap-test-api.service';
import { BaseComponent } from './../../../shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { StemInScrapForm } from '../models/stem-in-scrap-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-stem-in-scrap-tests',
	templateUrl: './edit-stem-in-scrap-tests.component.html'
})
export class EditStemInScrapTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public stemInScrapForm!: StemInScrapForm;
	constructor(private stemInScrapTestApiService: StemInScrapTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.stemInScrapTestApiService.getStemInScrapById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.stemInScrapForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: StemInScrapForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemInScrapTestEntry = {
			...result,
			entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateStemInScrapTestRequest(data);

		this.stemInScrapTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Stem in scrap test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
