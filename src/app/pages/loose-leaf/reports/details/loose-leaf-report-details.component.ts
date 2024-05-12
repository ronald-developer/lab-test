import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { LooseLeafTestReportApiService } from './../../../../api-services/lab-tests/loose-leaf-test-report-api/loose-leaf-test-report-api.service';
import { RequestLooseLeafTestReportSearchCriteria } from './../../../../api-services/lab-tests/loose-leaf-test-report-api/models/request-loose-leaf-test-report-search-criteria';
import { PostSearchLooseLeafTestDetailsReportRequest } from './../../../../api-services/lab-tests/loose-leaf-test-report-api/requests/post-search-loose-leaf-test-details-report-request';
import { tap } from 'rxjs/operators';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-loose-leaf-report-details',
  templateUrl: './loose-leaf-report-details.component.html'
})
export class LooseLeafReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private LooseLeafTestReportApiService: LooseLeafTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Loose leaf tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestLooseLeafTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchLooseLeafTestDetailsReportRequest(searchCriteria);
    this.LooseLeafTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'loose_leaf_report_details.xlsx');
      }), this.endLoading()).subscribe();
  }
}
