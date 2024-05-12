import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { ShakerEfficiencyTestReportApiService } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/shaker-efficiency-test-report-api.service';
import { RequestShakerEfficiencyTestReportSearchCriteria } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/models/request-shaker-efficiency-test-report-search-criteria';
import { PostSearchShakerEfficiencyTestSummaryReportRequest } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/requests/post-search-shaker-efficiency-test-summary-report-request';

@Component({
  selector: 'app-shaker-efficiency-report-summary',
  templateUrl: './shaker-efficiency-report-summary.component.html'
})
export class ShakerEfficiencyReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private shakerEfficiencyTestReportApiService: ShakerEfficiencyTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Shaker efficiency tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestShakerEfficiencyTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchShakerEfficiencyTestSummaryReportRequest(searchCriteria);
    this.shakerEfficiencyTestReportApiService.summaryReport(request).pipe(
      tap(x => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'shaker_efficiency_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
