import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { DensityTestApiService } from '../../../api-services/lab-tests/density-test-api/density-test-api.service';
import { RequestDensityTestEntry } from '../../../api-services/lab-tests/density-test-api/models/request-density-test-entry';
import { PostCreateDensityTestRequest } from '../../../api-services/lab-tests/density-test-api/requests/post-create-density-test-request';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { DensityForm } from '../models/density-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
  selector: 'app-create-density-tests',
  templateUrl: './create-density-tests.component.html'
})
export class CreateDensityTestsComponent extends BaseComponent implements OnInit {

  constructor(private densityTestApiService: DensityTestApiService,
    private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
    private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
  public reset: boolean = false;
  public save(result: DensityForm) {
    this.loading(true);
    const entryDate = result.entryDate as Date;
    const entryTime = result.entryTime as Date;
    const data: RequestDensityTestEntry = {
      ...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
    }
    const request = new PostCreateDensityTestRequest(data);
    this.densityTestApiService.create(request).pipe(
      tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
        this.reset = true;
        this.toastr.success('Density test created', 'Success!');
        this.detector.detectChanges();
      }),
      this.endLoading()).subscribe();
  }
}

