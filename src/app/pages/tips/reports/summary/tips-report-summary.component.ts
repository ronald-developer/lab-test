import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';
import { RequestTipsTestReportSearchCriteria } from '../../../../api-services/lab-tests/tips-test-report-api/models/request-tips-test-report-search-criteria';
import { PostSearchTipsTestSummaryReportRequest } from '../../../../api-services/lab-tests/tips-test-report-api/requests/post-search-tips-test-summary-report-request';
import { TipsTestReportApiService } from '../../../../api-services/lab-tests/tips-test-report-api/tips-test-report-api.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
  selector: 'app-tips-report-summary',
  templateUrl: './tips-report-summary.component.html'
})
export class TipsReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private tipsTestReportApiService: TipsTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Tips tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestTipsTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchTipsTestSummaryReportRequest(searchCriteria);
    this.tipsTestReportApiService.summaryReport(request).pipe(
      tap(x => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'tips_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
