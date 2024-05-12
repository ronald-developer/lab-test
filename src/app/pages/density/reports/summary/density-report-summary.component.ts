import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { DensityTestReportApiService } from '../../../../api-services/lab-tests/density-test-report-api/density-test-report-api.service';
import { RequestDensityTestReportSearchCriteria } from '../../../../api-services/lab-tests/density-test-report-api/models/request-density-test-report-search-criteria';
import { PostSearchDensityTestSummaryReportRequest } from '../../../../api-services/lab-tests/density-test-report-api/requests/post-search-density-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-density-report-summary',
  templateUrl: './density-report-summary.component.html'
})
export class DensityReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;

  constructor(private densityTestReportApiService: DensityTestReportApiService, private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Density tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestDensityTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchDensityTestSummaryReportRequest(searchCriteria);
    this.densityTestReportApiService.summaryReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'density_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
