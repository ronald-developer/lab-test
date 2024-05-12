import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PostSearchLeavesTestSummaryReportRequest } from '../../../../api-services/lab-tests/leaves-test-report-api/requests/post-search-leaves-test-summary-report-request';
import { RequestLeavesTestReportSearchCriteria } from './../../../../api-services/lab-tests/leaves-test-report-api/models/request-leaves-test-report-search-criteria';
import { LeavesTestReportApiService } from './../../../../api-services/lab-tests/leaves-test-report-api/leaves-test-report-api.service';
import { tap } from 'rxjs';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-leaves-report-summary',
	templateUrl: './leaves-report-summary.component.html'
})
export class LeavesReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private leavesTestReportApiService: LeavesTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Leaves tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestLeavesTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchLeavesTestSummaryReportRequest(searchCriteria);
		this.leavesTestReportApiService.summaryReport(request).pipe(
			tap(x => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'leaves_report_summary.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
