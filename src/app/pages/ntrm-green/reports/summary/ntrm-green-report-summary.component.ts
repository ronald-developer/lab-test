import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { RequestNtrmGreenTestReportSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-green-test-report-api/models/request-ntrm-green-test-report-search-criteria';
import { NtrmGreenTestReportApiService } from 'src/app/api-services/lab-tests/ntrm-green-test-report-api/ntrm-green-test-report-api.service';
import { PostSearchNtrmGreenTestSummaryReportRequest } from 'src/app/api-services/lab-tests/ntrm-green-test-report-api/requests/post-search-ntrm-green-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-ntrm-green-report-summary',
	templateUrl: './ntrm-green-report-summary.component.html'
})
export class NtrmGreenReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private ntrmGreenTestReportApiService: NtrmGreenTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Ntrm green tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestNtrmGreenTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmGreenTestSummaryReportRequest(searchCriteria);
		this.ntrmGreenTestReportApiService.summaryReport(request).pipe(
			tap(x => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'ntrm_green_report_summary.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
