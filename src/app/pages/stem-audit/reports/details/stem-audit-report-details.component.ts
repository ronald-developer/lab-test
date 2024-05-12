import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { RequestStemAuditTestReportSearchCriteria } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/models/request-stem-audit-test-report-search-criteria';
import { PostSearchStemAuditTestDetailsReportRequest } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/requests/post-search-stem-audit-test-details-report-request';
import { StemAuditTestReportApiService } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/stem-audit-test-report-api.service';

@Component({
  selector: 'app-stem-audit-report-details',
  templateUrl: './stem-audit-report-details.component.html'
})
export class StemAuditReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemAuditTestReportApiService: StemAuditTestReportApiService, private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Stem audit tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemAuditTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemAuditTestDetailsReportRequest(searchCriteria);
    this.stemAuditTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_audit_report_details.xlsx');
      }),
      this.endLoading()).subscribe();
  }

}
