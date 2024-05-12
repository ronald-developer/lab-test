import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { PostCreateFlagOnStemTestRequest } from 'src/app/api-services/lab-tests/flag-on-stem-test-api/requests/post-create-flag-on-stem-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FlagOnStemTestApiService } from './../../../api-services/lab-tests/flag-on-stem-test-api/flag-on-stem-test-api.service';
import { RequestFlagOnStemTestEntry } from './../../../api-services/lab-tests/flag-on-stem-test-api/models/request-flag-on-stem-test-entry';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { FlagOnStemForm } from './../models/flag-on-stem-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
  selector: 'app-create-flag-on-stem-tests',
  templateUrl: './create-flag-on-stem-tests.component.html'
})
export class CreateFlagOnStemTestsComponent extends BaseComponent implements OnInit {

  constructor(private flagOnStemTestApiService: FlagOnStemTestApiService,
    private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
    private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
  public reset: boolean = false;
  public save(result: FlagOnStemForm) {
    this.loading(true);
    const entryDate = result.entryDate as Date;
    const entryTime = result.entryTime as Date;
    const data: RequestFlagOnStemTestEntry = {
      ...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
    }
    const request = new PostCreateFlagOnStemTestRequest(data);
    this.flagOnStemTestApiService.create(request).pipe(
      tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
        this.reset = true;
        this.toastr.success('Flag on stem test created', 'Success!');
        this.detector.detectChanges();
      }),
      this.endLoading()).subscribe();
  }
}
