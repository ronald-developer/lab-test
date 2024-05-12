import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';
import { RequestBundleBusterTestReportSearchCriteria } from '../../../../api-services/lab-tests/bundle-buster-test-report-api/models/request-bundle-buster-test-report-search-criteria';
import { PostSearchBundleBusterTestDetailsReportRequest } from '../../../../api-services/lab-tests/bundle-buster-test-report-api/requests/post-search-bundle-buster-test-details-report-request';
import { BundleBusterTestReportApiService } from '../../../../api-services/lab-tests/bundle-buster-test-report-api/bundle-buster-test-report-api.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
	selector: 'app-bundle-buster-report-details',
	templateUrl: './bundle-buster-report-details.component.html'
})
export class BundleBusterReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private bundleBusterTestReportApiService: BundleBusterTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade, Fields.ShiftType], newFields: [Fields.PositionType] });
		this.config = BaseReportConfiguration.initialize('Bundle buster tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestBundleBusterTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchBundleBusterTestDetailsReportRequest(searchCriteria);
		this.bundleBusterTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'bundle_buster_report_details.xlsx');
			}), this.endLoading()).subscribe();
	}

}
