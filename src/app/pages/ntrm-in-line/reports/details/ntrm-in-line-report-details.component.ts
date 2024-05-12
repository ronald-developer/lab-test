import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { RequestNtrmInLineTestReportSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-in-line-test-report-api/models/request-ntrm-in-line-test-report-search-criteria';
import { NtrmInLineTestReportApiService } from 'src/app/api-services/lab-tests/ntrm-in-line-test-report-api/ntrm-in-line-test-report-api.service';
import { PostSearchNtrmInLineTestDetailsReportRequest } from 'src/app/api-services/lab-tests/ntrm-in-line-test-report-api/requests/post-search-ntrm-in-line-test-details-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-ntrm-in-line-report-details',
  templateUrl: './ntrm-in-line-report-details.component.html'
})
export class NtrmInLineReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private ntrmInLineTestReportApiService: NtrmInLineTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Ntrm in line tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestNtrmInLineTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmInLineTestDetailsReportRequest(searchCriteria);
		this.ntrmInLineTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'ntrm_in_line_report_details.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
