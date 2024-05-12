import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { DegsTestReportApiService } from 'src/app/api-services/lab-tests/degs-test-report-api/degs-test-report-api.service';
import { RequestDegsTestReportSearchCriteria } from 'src/app/api-services/lab-tests/degs-test-report-api/models/request-degs-test-report-search-criteria';
import { PostSearchDegsTestDetailsReportRequest } from 'src/app/api-services/lab-tests/degs-test-report-api/requests/post-search-degs-test-details-report-request';
import { BaseReportConfig, BaseReportConfiguration } from 'src/app/shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import * as saveAs from 'file-saver';

@Component({
	selector: 'app-degs-report-details',
	templateUrl: './degs-report-details.component.html'
})
export class DegsReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private degsTestReportApiService: DegsTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Degs tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestDegsTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchDegsTestDetailsReportRequest(searchCriteria);
		this.degsTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'degs_report_details.xlsx');
			}), this.endLoading()).subscribe();
	}

}
