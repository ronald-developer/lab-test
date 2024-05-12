import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { RequestInlineDataTestReportSearchCriteria } from '../../../../api-services/lab-tests/inline-data-test-report-api/models/request-inline-data-test-report-search-criteria';
import { PostSearchInlineDataTestDetailsReportRequest } from '../../../../api-services/lab-tests/inline-data-test-report-api/requests/post-search-inline-data-test-details-report-request';
import { InlineDataTestReportApiService } from '../../../../api-services/lab-tests/inline-data-test-report-api/inline-data-test-report-api.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-inline-data-report-details',
  templateUrl: './inline-data-report-details.component.html'
})
export class InlineDataReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private inlineDataTestReportApiService: InlineDataTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('InlineData tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestInlineDataTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchInlineDataTestDetailsReportRequest(searchCriteria);
    this.inlineDataTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'inline_data_report_details.xlsx');
      }), this.endLoading()).subscribe();
  }

}
