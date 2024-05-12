import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { RequestNtrmProductTestReportSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/models/request-ntrm-product-test-report-search-criteria';
import { NtrmProductTestReportApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/ntrm-product-test-report-api.service';
import { PostSearchNtrmProductTestSummaryReportRequest } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/requests/post-search-ntrm-product-test-summary-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-ntrm-product-report-summary',
  templateUrl: './ntrm-product-report-summary.component.html'
})
export class NtrmProductReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private ntrmProductTestReportApiService: NtrmProductTestReportApiService,
	  private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
	  super();
	  const formFilter = this.portletFilterFormBuilderService.buildForm();
	  this.config = BaseReportConfiguration.initialize('Ntrm product tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestNtrmProductTestReportSearchCriteria) {
	  this.loading(true);
	  const request = new PostSearchNtrmProductTestSummaryReportRequest(searchCriteria);
	  this.ntrmProductTestReportApiService.summaryReport(request).pipe(
		tap((x) => {
		  const blob = new Blob([x], { type: 'application/xlsx' });
		  saveAs(blob, 'ntrm_product_report_summary.xlsx');
		}),
		this.endLoading()).subscribe();
	}
  }
