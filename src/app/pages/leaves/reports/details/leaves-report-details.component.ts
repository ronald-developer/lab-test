import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { LeavesTestReportApiService } from './../../../../api-services/lab-tests/leaves-test-report-api/leaves-test-report-api.service';
import { RequestLeavesTestReportSearchCriteria } from './../../../../api-services/lab-tests/leaves-test-report-api/models/request-leaves-test-report-search-criteria';
import { PostSearchLeavesTestDetailsReportRequest } from './../../../../api-services/lab-tests/leaves-test-report-api/requests/post-search-leaves-test-details-report-request';
import { tap } from 'rxjs/operators';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-leaves-report-details',
  templateUrl: './leaves-report-details.component.html'
})
export class LeavesReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private leavesTestReportApiService: LeavesTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Leaves tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestLeavesTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchLeavesTestDetailsReportRequest(searchCriteria);
    this.leavesTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'leaves_report_details.xlsx');
      }), this.endLoading()).subscribe();
  }
}
