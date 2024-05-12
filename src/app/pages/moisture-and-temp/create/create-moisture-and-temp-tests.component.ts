import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { MoistureAndTempTestApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/moisture-and-temp-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { RequestMoistureAndTempTestEntryModel } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/models/request-moisture-and-temp-test-entry-model';
import { MoistureAndTempNavigationPath } from '../navigation/moisture-and-temp-navigation-path';
import { Router } from '@angular/router';
import { MoistureAndTempTestForm } from '../models/moisture-and-temp-form-descriptor';
import { PostCreateMoistureAndTempTestRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/requests/post-create-moisture-and-temp-test-request';

@Component({
	selector: 'app-create-moisture-and-temp-tests',
	templateUrl: './create-moisture-and-temp-tests.component.html'
})
export class CreateMoistureAndTempTestsComponent extends BaseComponent implements OnInit {

	constructor(private moistureAndTempTestApiService: MoistureAndTempTestApiService,
		private toastr: ToastrService,
		private storedLabTestParamsProvider: StoredLabTestParamsProvider,
		private detector: ChangeDetectorRef,
		private router: Router) {
		super();
	}

	ngOnInit(): void {
	}

	public reset: boolean = false;
	public save(result: MoistureAndTempTestForm) {
		this.loading(true);
		const data: RequestMoistureAndTempTestEntryModel = {
			...result
		}
		const request = new PostCreateMoistureAndTempTestRequest(data);
		this.moistureAndTempTestApiService.create(request).pipe(
			tap(() => {
				this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
				this.reset = true;
				this.toastr.success('Moisture and temp test created', 'Success!');
				this.detector.detectChanges();
				location.reload();
			}), this.endLoading()).subscribe();
	}

	private routeToBatchList(): void {
		this.router.navigateByUrl(`/${MoistureAndTempNavigationPath.parent}/${MoistureAndTempNavigationPath.children.list}`);
	}
}
