import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestSandTestEntry } from 'src/app/api-services/lab-tests/sand-test-api/models/request-sand-test-entry';
import { PostCreateSandTestRequest } from 'src/app/api-services/lab-tests/sand-test-api/requests/post-create-sand-test-request';
import { SandTestApiService } from 'src/app/api-services/lab-tests/sand-test-api/sand-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { SandForm } from '../models/sand-form-descriptor';

@Component({
  selector: 'app-create-sand-tests',
  templateUrl: './create-sand-tests.component.html'
})
export class CreateSandTestsComponent extends BaseComponent implements OnInit {

	constructor(private sandTestApiService: SandTestApiService,
	  private toastr: ToastrService,
	  private storedLabTestParamsProvider: StoredLabTestParamsProvider,
	  private detector: ChangeDetectorRef) {
	  super();
	}

	ngOnInit(): void {
	}

	public reset: boolean = false;
	public save(result: SandForm) {
	  this.loading(true);
	  const entryDate = result.entryDate as Date;
	  const entryTime = result.entryTime as Date;
	  const data: RequestSandTestEntry = {
		...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
	  }
	  const request = new PostCreateSandTestRequest(data);
	  this.sandTestApiService.create(request).pipe(
		tap(() => {
		  this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
		  this.reset = true;
		  this.toastr.success('Sand test created', 'Success!');
		  this.detector.detectChanges();
		}), this.endLoading()).subscribe();
	}
  }

