import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { RequestMoistureAndTempTestReportSearchCriteria } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/models/request-moisture-and-temp-test-report-search-criteria';
import { MoistureAndTempTestReportApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/moisture-and-temp-test-report-api.service';
import { PostSearchMoistureAndTempTestSummaryReportRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/requests/post-search-moisture-and-temp-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
  selector: 'app-moisture-and-temp-report-summary',
  templateUrl: './moisture-and-temp-report-summary.component.html'
})
export class MoistureAndTempReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private moistureAndTempTestReportApiService: MoistureAndTempTestReportApiService,
	  private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
	  super();
	  const formFilter = this.portletFilterFormBuilderService.buildForm();
	  this.config = BaseReportConfiguration.initialize('Moisture and temp tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestMoistureAndTempTestReportSearchCriteria) {
	  this.loading(true);
	  const request = new PostSearchMoistureAndTempTestSummaryReportRequest(searchCriteria);
	  this.moistureAndTempTestReportApiService.summaryReport(request).pipe(
		tap((x) => {
		  const blob = new Blob([x], { type: 'application/xlsx' });
		  saveAs(blob, 'moisture_and_temp_report_summary.xlsx');
		}),
		this.endLoading()).subscribe();
	}
  }
