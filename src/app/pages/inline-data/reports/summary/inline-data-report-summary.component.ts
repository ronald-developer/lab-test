import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { InlineDataTestReportApiService } from '../../../../api-services/lab-tests/inline-data-test-report-api/inline-data-test-report-api.service';
import { RequestInlineDataTestReportSearchCriteria } from '../../../../api-services/lab-tests/inline-data-test-report-api/models/request-inline-data-test-report-search-criteria';
import { PostSearchInlineDataTestSummaryReportRequest } from '../../../../api-services/lab-tests/inline-data-test-report-api/requests/post-search-inline-data-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
  selector: 'app-inline-data-report-summary',
  templateUrl: './inline-data-report-summary.component.html'
})
export class InlineDataReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private inlineDataTestReportApiService: InlineDataTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Inline data tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestInlineDataTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchInlineDataTestSummaryReportRequest(searchCriteria);
    this.inlineDataTestReportApiService.summaryReport(request).pipe(
      tap(x => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'inline_data_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
