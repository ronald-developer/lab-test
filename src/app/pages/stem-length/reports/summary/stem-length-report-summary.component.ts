import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { RequestStemLengthTestReportSearchCriteria } from './../../../../api-services/lab-tests/stem-length-test-report-api/models/request-stem-length-test-report-search-criteria';
import { PostSearchStemLengthTestSummaryReportRequest } from './../../../../api-services/lab-tests/stem-length-test-report-api/requests/post-search-stem-length-test-summary-report-request';
import { StemLengthTestReportApiService } from './../../../../api-services/lab-tests/stem-length-test-report-api/stem-length-test-report-api.service';
import { BaseComponent } from './../../../../shared/components/base/base.component';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-stem-length-report-summary',
  templateUrl: './stem-length-report-summary.component.html'
})
export class StemLengthReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemLengthTestReportApiService: StemLengthTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm();
    this.config = BaseReportConfiguration.initialize('Stem length tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemLengthTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemLengthTestSummaryReportRequest(searchCriteria);
    this.stemLengthTestReportApiService.summaryReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_length_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
