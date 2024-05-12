import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DensityTestReportApiService } from '../../../../api-services/lab-tests/density-test-report-api/density-test-report-api.service';
import { RequestDensityTestReportSearchCriteria } from '../../../../api-services/lab-tests/density-test-report-api/models/request-density-test-report-search-criteria';
import { PostSearchDensityTestDetailsReportRequest } from '../../../../api-services/lab-tests/density-test-report-api/requests/post-search-density-test-details-report-request';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
  selector: 'app-density-report-details',
  templateUrl: './density-report-details.component.html'
})
export class DensityReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private densityTestReportApiService: DensityTestReportApiService, private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
    this.config = BaseReportConfiguration.initialize('Density tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestDensityTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchDensityTestDetailsReportRequest(searchCriteria);
    this.densityTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'density_report_details.xlsx');
      }),
      this.endLoading()).subscribe();
  }

}
