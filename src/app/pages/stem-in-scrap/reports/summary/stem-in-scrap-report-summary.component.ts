import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PostSearchStemInScrapTestSummaryReportRequest } from '../../../../api-services/lab-tests/stem-in-scrap-test-report-api/requests/post-search-stem-in-scrap-test-summary-report-request';
import { RequestStemInScrapTestReportSearchCriteria } from './../../../../api-services/lab-tests/stem-in-scrap-test-report-api/models/request-stem-in-scrap-test-report-search-criteria';
import { StemInScrapTestReportApiService } from './../../../../api-services/lab-tests/stem-in-scrap-test-report-api/stem-in-scrap-test-report-api.service';
import { tap } from 'rxjs/operators';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-stem-in-scrap-report-summary',
  templateUrl: './stem-in-scrap-report-summary.component.html'
})
export class StemInScrapReportSummaryComponent  extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemInScrapTestReportApiService: StemInScrapTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm();
    this.config = BaseReportConfiguration.initialize('Stem in scrap tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemInScrapTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemInScrapTestSummaryReportRequest(searchCriteria);
    this.stemInScrapTestReportApiService.summaryReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_in_scrap_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
