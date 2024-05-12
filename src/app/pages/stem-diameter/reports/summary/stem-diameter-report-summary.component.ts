import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PostSearchStemDiameterTestSummaryReportRequest } from '../../../../api-services/lab-tests/stem-diameter-test-report-api/requests/post-search-stem-diameter-test-summary-report-request';
import { RequestStemDiameterTestReportSearchCriteria } from './../../../../api-services/lab-tests/stem-diameter-test-report-api/models/request-stem-diameter-test-report-search-criteria';
import { StemDiameterTestReportApiService } from './../../../../api-services/lab-tests/stem-diameter-test-report-api/stem-diameter-test-report-api.service';
import { tap } from 'rxjs/operators';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-stem-diameter-report-summary',
  templateUrl: './stem-diameter-report-summary.component.html'
})
export class StemDiameterReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemDiameterTestReportApiService: StemDiameterTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm();
    this.config = BaseReportConfiguration.initialize('Stem diameter tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemDiameterTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemDiameterTestSummaryReportRequest(searchCriteria);
    this.stemDiameterTestReportApiService.summaryReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_diameter_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
