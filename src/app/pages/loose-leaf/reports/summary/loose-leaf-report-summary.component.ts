import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PostSearchLooseLeafTestSummaryReportRequest } from '../../../../api-services/lab-tests/loose-leaf-test-report-api/requests/post-search-loose-leaf-test-summary-report-request';
import { RequestLooseLeafTestReportSearchCriteria } from './../../../../api-services/lab-tests/loose-leaf-test-report-api/models/request-loose-leaf-test-report-search-criteria';
import { LooseLeafTestReportApiService } from './../../../../api-services/lab-tests/loose-leaf-test-report-api/loose-leaf-test-report-api.service';
import { tap } from 'rxjs';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-loose-leaf-report-summary',
  templateUrl: './loose-leaf-report-summary.component.html'
})
export class LooseLeafReportSummaryComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private LooseLeafTestReportApiService: LooseLeafTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Loose leaf tests report summary', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestLooseLeafTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchLooseLeafTestSummaryReportRequest(searchCriteria);
    this.LooseLeafTestReportApiService.summaryReport(request).pipe(
      tap(x => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'loose_leaf_report_summary.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
