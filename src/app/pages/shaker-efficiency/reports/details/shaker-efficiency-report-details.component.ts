import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { RequestShakerEfficiencyTestReportSearchCriteria } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/models/request-shaker-efficiency-test-report-search-criteria';
import { ShakerEfficiencyTestReportApiService } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/shaker-efficiency-test-report-api.service';
import { PostSearchShakerEfficiencyTestDetailsReportRequest } from 'src/app/api-services/lab-tests/shaker-efficiency-test-report-api/requests/post-search-shaker-efficiency-test-details-report-request';

@Component({
	selector: 'app-shaker-efficiency-report-details',
	templateUrl: './shaker-efficiency-report-details.component.html'
})
export class ShakerEfficiencyReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private shakerEfficiencyTestReportApiService: ShakerEfficiencyTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Shaker efficiency tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestShakerEfficiencyTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchShakerEfficiencyTestDetailsReportRequest(searchCriteria);
		this.shakerEfficiencyTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'shaker_efficiency_report_details.xlsx');
			}), this.endLoading()).subscribe();
	}

}
