import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { ButtedLooseLeafTestReportApiService } from './../../../../api-services/lab-tests/butted-loose-leaf-test-report-api/butted-loose-leaf-test-report-api.service';
import { RequestButtedLooseLeafTestReportSearchCriteria } from './../../../../api-services/lab-tests/butted-loose-leaf-test-report-api/models/request-butted-loose-leaf-test-report-search-criteria';
import { PostSearchButtedLooseLeafTestDetailsReportRequest } from './../../../../api-services/lab-tests/butted-loose-leaf-test-report-api/requests/post-search-butted-loose-leaf-test-details-report-request';
import { tap } from 'rxjs/operators';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-butted-loose-leaf-report-details',
  templateUrl: './butted-loose-leaf-report-details.component.html'
})
export class ButtedLooseLeafReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private buttedLooseLeafTestReportApiService: ButtedLooseLeafTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Butted loose leaf tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestButtedLooseLeafTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchButtedLooseLeafTestDetailsReportRequest(searchCriteria);
    this.buttedLooseLeafTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'butted_loose_leaf_report_details.xlsx');
      }), this.endLoading()).subscribe();
  }
}
