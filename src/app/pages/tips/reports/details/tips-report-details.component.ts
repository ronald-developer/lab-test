import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs/operators';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';
import { RequestTipsTestReportSearchCriteria } from '../../../../api-services/lab-tests/tips-test-report-api/models/request-tips-test-report-search-criteria';
import { PostSearchTipsTestDetailsReportRequest } from '../../../../api-services/lab-tests/tips-test-report-api/requests/post-search-tips-test-details-report-request';
import { TipsTestReportApiService } from '../../../../api-services/lab-tests/tips-test-report-api/tips-test-report-api.service';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';

@Component({
	selector: 'app-tips-report-details',
	templateUrl: './tips-report-details.component.html'
})
export class TipsReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private tipsTestReportApiService: TipsTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Tips tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestTipsTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchTipsTestDetailsReportRequest(searchCriteria);
		this.tipsTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'tips_report_details.xlsx');
			}), this.endLoading()).subscribe();
	}

}
