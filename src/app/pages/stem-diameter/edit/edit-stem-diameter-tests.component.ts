import { PutUpdateStemDiameterTestRequest } from './../../../api-services/lab-tests/stem-diameter-test-api/requests/put-update-stem-diameter-test-request';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { RequestStemDiameterTestEntry } from './../../../api-services/lab-tests/stem-diameter-test-api/models/request-stem-diameter-test-entry';
import { StemDiameterTestApiService } from './../../../api-services/lab-tests/stem-diameter-test-api/stem-diameter-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { StemDiameterForm } from '../models/stem-diameter-form-descriptor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
@Component({
	selector: 'app-edit-stem-diameter-tests',
	templateUrl: './edit-stem-diameter-tests.component.html'
})
export class EditStemDiameterTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public stemDiameterForm!: StemDiameterForm;
	constructor(private stemDiameterTestApiService: StemDiameterTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.stemDiameterTestApiService.getStemDiameterById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.stemDiameterForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: StemDiameterForm) {
		this.loading(false);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestStemDiameterTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateStemDiameterTestRequest(data);

		this.stemDiameterTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Stem diameter test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}

}
