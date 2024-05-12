import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { RequestNtrmProductTestReportSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/models/request-ntrm-product-test-report-search-criteria';
import { NtrmProductTestReportApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/ntrm-product-test-report-api.service';
import { PostSearchNtrmProductTestDetailsReportRequest } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/requests/post-search-ntrm-product-test-details-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import * as saveAs from 'file-saver';

@Component({
	selector: 'app-ntrm-product-report-details',
	templateUrl: './ntrm-product-report-details.component.html'
})
export class NtrmProductReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private ntrmProductTestReportApiService: NtrmProductTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Ntrm product tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestNtrmProductTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmProductTestDetailsReportRequest(searchCriteria);
		this.ntrmProductTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'ntrm_product_report_details.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
