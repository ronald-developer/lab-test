import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { InlineHsTestReportApiService } from '../../../../api-services/lab-tests/inline-hs-test-report-api/inline-hs-test-report-api.service';
import { RequestInlineHsTestReportSearchCriteria } from '../../../../api-services/lab-tests/inline-hs-test-report-api/models/request-inline-hs-test-report-search-criteria';
import { PostSearchInlineHsTestSummaryReportRequest } from '../../../../api-services/lab-tests/inline-hs-test-report-api/requests/post-search-inline-hs-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
  selector: 'app-inline-hs-report-summary',
  templateUrl: './inline-hs-report-summary.component.html'
})
export class InlineHsReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private inlineHsTestReportApiService: InlineHsTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('InlineHs tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestInlineHsTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchInlineHsTestSummaryReportRequest(searchCriteria);
    this.inlineHsTestReportApiService.summaryReport(request).pipe(
      tap(x => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'inlinehs_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
