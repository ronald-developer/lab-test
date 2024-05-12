import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { RequestStemInScrapTestReportSearchCriteria } from './../../../../api-services/lab-tests/stem-in-scrap-test-report-api/models/request-stem-in-scrap-test-report-search-criteria';
import { PostSearchStemInScrapTestDetailsReportRequest } from './../../../../api-services/lab-tests/stem-in-scrap-test-report-api/requests/post-search-stem-in-scrap-test-details-report-request';

import { tap } from 'rxjs/operators';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { StemInScrapTestReportApiService } from '../../../../api-services/lab-tests/stem-in-scrap-test-report-api/stem-in-scrap-test-report-api.service';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-stem-in-scrap-report-details',
  templateUrl: './stem-in-scrap-report-details.component.html'
})
export class StemInScrapReportDetailsComponent extends BaseComponent {
  public config!: BaseReportConfig;
  constructor(private stemInScrapTestReportApiService: StemInScrapTestReportApiService,
    private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
    super();
    const formFilter = this.portletFilterFormBuilderService.buildForm();
    this.config = BaseReportConfiguration.initialize('Stem in scrap tests report details', 'Export', true, formFilter);
  }

  public export(searchCriteria: RequestStemInScrapTestReportSearchCriteria) {
    this.loading(true);
    const request = new PostSearchStemInScrapTestDetailsReportRequest(searchCriteria);
    this.stemInScrapTestReportApiService.detailsReport(request).pipe(
      tap((x) => {
        const blob = new Blob([x], { type: 'application/xlsx' });
        saveAs(blob, 'stem_in_scrap_report_details.xlsx');
      }),
      this.endLoading()).subscribe();
  }
}
