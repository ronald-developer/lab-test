import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { RequestMoistureAndTempTestReportSearchCriteria } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/models/request-moisture-and-temp-test-report-search-criteria';
import { MoistureAndTempTestReportApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/moisture-and-temp-test-report-api.service';
import { PostSearchMoistureAndTempTestDetailsReportRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/requests/post-search-moisture-and-temp-test-details-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-moisture-and-temp-report-details',
  templateUrl: './moisture-and-temp-report-details.component.html'
})
export class MoistureAndTempReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private moistureAndTempTestReportApiService: MoistureAndTempTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Moisture and temp tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestMoistureAndTempTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchMoistureAndTempTestDetailsReportRequest(searchCriteria);
		this.moistureAndTempTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'moisture_and_temp_report_details.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
