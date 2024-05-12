import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RequestShortStemTestEntry } from './../../../api-services/lab-tests/short-stem-test-api/models/request-short-stem-test-entry';
import { PostCreateShortStemTestRequest } from './../../../api-services/lab-tests/short-stem-test-api/requests/post-create-short-stem-test-request';
import { ShortStemTestApiService } from './../../../api-services/lab-tests/short-stem-test-api/short-stem-test-api.service';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { ShortStemForm } from './../models/short-stem-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';
@Component({
  selector: 'app-create-short-stem-tests',
  templateUrl: './create-short-stem-tests.component.html'
})
export class CreateShortStemTestsComponent extends BaseComponent implements OnInit {

  constructor(private shortStemTestApiService: ShortStemTestApiService,
    private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
    private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
  public reset: boolean = false;
  public save(result: ShortStemForm) {
    this.loading(true);
    const entryDate = result.entryDate as Date;
    const entryTime = result.entryTime as Date;
    const data: RequestShortStemTestEntry = {
      ...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
    }
    const request = new PostCreateShortStemTestRequest(data);
    this.shortStemTestApiService.create(request).pipe(
      tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
        this.reset = true;
        this.toastr.success('Stem length test created', 'Success!');
        this.detector.detectChanges();
      }),
      this.endLoading()).subscribe();
  }
}
