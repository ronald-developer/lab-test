import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RequestStemDiameterTestEntry } from './../../../api-services/lab-tests/stem-diameter-test-api/models/request-stem-diameter-test-entry';
import { PostCreateStemDiameterTestRequest } from './../../../api-services/lab-tests/stem-diameter-test-api/requests/post-create-stem-diameter-test-request';
import { StemDiameterTestApiService } from './../../../api-services/lab-tests/stem-diameter-test-api/stem-diameter-test-api.service';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { StemDiameterForm } from './../models/stem-diameter-form-descriptor';
import { StoredLabTestParamsProvider } from 'src/app/shared/services/stored-lab-test-params.provider.service';
import { LabTestVariables } from 'src/app/shared/models/lab-test-variables';

@Component({
  selector: 'app-create-stem-diameter-tests',
  templateUrl: './create-stem-diameter-tests.component.html'
})
export class CreateStemDiameterTestsComponent extends BaseComponent implements OnInit {

  constructor(private stemDiameterTestApiService: StemDiameterTestApiService,
    private toastr: ToastrService,
    private storedLabTestParamsProvider: StoredLabTestParamsProvider,
    private detector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
  }
  public reset: boolean = false;
  public save(result: StemDiameterForm) {
    this.loading(true);
    const entryDate = result.entryDate as Date;
    const entryTime = result.entryTime as Date;
    const data: RequestStemDiameterTestEntry = {
      ...result, entryDate: DateTimeHelper.getDateTimezoneOffset(entryDate, entryTime)
    }
    const request = new PostCreateStemDiameterTestRequest(data);
    this.stemDiameterTestApiService.create(request).pipe(
      tap(() => {
        this.storedLabTestParamsProvider.storeParams(new LabTestVariables(result).parameters);
        this.reset = true;
        this.toastr.success('Stem diameter test created', 'Success!');
        this.detector.detectChanges();
      }),
      this.endLoading()).subscribe();
  }
}
