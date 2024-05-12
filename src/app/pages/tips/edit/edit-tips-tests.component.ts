import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TipsTestApiService } from './../../../api-services/lab-tests/tips-test-api/tips-test-api.service';
import { BaseComponent } from './../../../shared/components/base/base.component';
import { TipsForm } from '../models/tips-form-descriptor';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { tap } from 'rxjs/operators';
import { RequestTipsTestEntry } from './../../../api-services/lab-tests/tips-test-api/models/request-tips-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { PutUpdateTipsTestRequest } from './../../../api-services/lab-tests/tips-test-api/requests/put-update-tips-test-request';

@Component({
	selector: 'app-edit-tips-tests',
	templateUrl: './edit-tips-tests.component.html'
})
export class EditTipsTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public tipsForm!: TipsForm;
	constructor(private tipsTestApiService: TipsTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.tipsTestApiService.getTipsById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.tipsForm = { ...response, entryTime: new Date(response.entryDate), entryDate: new Date(response.entryDate) };
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: TipsForm) {
		this.loading(true);
		const entryDate = result.entryDate as Date;
		const entryTime = result.entryTime as Date;
		const data: RequestTipsTestEntry = {
			...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
		}
		const request = new PutUpdateTipsTestRequest(data);

		this.tipsTestApiService.update(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Tips test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
