import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { RequestStemDiameterTestReportSearchCriteria } from './../../../../api-services/lab-tests/stem-diameter-test-report-api/models/request-stem-diameter-test-report-search-criteria';
import { PostSearchStemDiameterTestDetailsReportRequest } from './../../../../api-services/lab-tests/stem-diameter-test-report-api/requests/post-search-stem-diameter-test-details-report-request';
import { StemDiameterTestReportApiService } from './../../../../api-services/lab-tests/stem-diameter-test-report-api/stem-diameter-test-report-api.service';
import { tap } from 'rxjs/operators';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-stem-diameter-report-details',
  templateUrl: './stem-diameter-report-details.component.html'
})
export class StemDiameterReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemDiameterTestReportApiService: StemDiameterTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm();
    this.config = BaseReportConfiguration.initialize('Stem diameter tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemDiameterTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemDiameterTestDetailsReportRequest(searchCriteria);
    this.stemDiameterTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_diameter_report_details.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
