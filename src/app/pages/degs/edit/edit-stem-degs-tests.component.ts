import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { DegsTestApiService } from 'src/app/api-services/lab-tests/degs-test-api/degs-test-api.service';
import { RequestStemDegsTestEntry } from 'src/app/api-services/lab-tests/degs-test-api/models/request-stem-degs-test-entry';
import { PutUpdateStemDegsTestRequest } from 'src/app/api-services/lab-tests/degs-test-api/requests/put-update-stem-degs-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { StemDegsForm } from '../models/stem-degs-form-descriptor';

@Component({
	selector: 'app-edit-stem-degs-tests',
	templateUrl: './edit-stem-degs-tests.component.html'
})
export class EditStemDegsTestsComponent extends BaseComponent implements OnInit, AfterViewInit {
	public reset: boolean = false;
	public testId: string;
	public stemDegsForm!: StemDegsForm;
	constructor(private degsTestApiService: DegsTestApiService,
		private activeModal: NgbActiveModal,
		private toastr: ToastrService,
		private detector: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		this.loading(true);
		this.degsTestApiService.getDegsById(this.testId).pipe(
			tap(result => {
				const response = result.response.data;
				this.stemDegsForm = {
					stemObj: response.stemObj,
					stemPan: response.stemPan,
					stemSampleWeight: response.stemSampleWeight,
					stemSevenMesh: response.stemSevenMesh,
					stemTwelveMesh: response.stemTwelveMesh
				};
			}),
			this.endLoading()).subscribe();
	}

	ngAfterViewInit(): void {
		kthelpers.MenuComponent.reinitialization();
	}

	public update(result: StemDegsForm) {
		this.loading(true);
		const data: RequestStemDegsTestEntry = {
			...result
		}
		const request = new PutUpdateStemDegsTestRequest(data);

		this.degsTestApiService.updateStemDegs(this.testId, request).pipe(tap(() => {
			this.reset = true;
			this.toastr.success('Stem degs test updated', 'Success!');
			this.close(true);
			this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}

	public close(isSaveChanges?: boolean) {
		this.activeModal.close(isSaveChanges);
	}
}
