import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { RequestSandTestReportSearchCriteria } from 'src/app/api-services/lab-tests/sand-test-report-api/models/request-sand-test-report-search-criteria';
import { PostSearchSandTestDetailsReportRequest } from 'src/app/api-services/lab-tests/sand-test-report-api/requests/post-search-sand-test-details-report-request';
import { SandTestReportApiService } from 'src/app/api-services/lab-tests/sand-test-report-api/sand-test-report-api.service';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-sand-report-details',
	templateUrl: './sand-report-details.component.html'
})
export class SandReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private sandTestReportApiService: SandTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Sand tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestSandTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchSandTestDetailsReportRequest(searchCriteria);
		this.sandTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'sand_report_details.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
