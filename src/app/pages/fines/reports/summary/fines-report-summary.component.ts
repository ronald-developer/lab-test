import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { FinesTestReportApiService } from 'src/app/api-services/lab-tests/fines-test-report-api/fines-test-report-api.service';
import { RequestFinesTestReportSearchCriteria } from 'src/app/api-services/lab-tests/fines-test-report-api/models/request-fines-test-report-search-criteria';
import { PostSearchFinesTestSummaryReportRequest } from 'src/app/api-services/lab-tests/fines-test-report-api/requests/post-search-fines-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-fines-report-summary',
	templateUrl: './fines-report-summary.component.html'
})
export class FinesReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private finesTestReportApiService: FinesTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Fines tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestFinesTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchFinesTestSummaryReportRequest(searchCriteria);
		this.finesTestReportApiService.summaryReport(request).pipe(
			tap(x => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'fines_report_summary.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
