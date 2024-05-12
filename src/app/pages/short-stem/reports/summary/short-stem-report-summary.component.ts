import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { PostSearchShortStemTestSummaryReportRequest } from '../../../../api-services/lab-tests/short-stem-test-report-api/requests/post-search-short-stem-test-summary-report-request';
import { RequestShortStemTestReportSearchCriteria } from './../../../../api-services/lab-tests/short-stem-test-report-api/models/request-short-stem-test-report-search-criteria';
import { ShortStemTestReportApiService } from './../../../../api-services/lab-tests/short-stem-test-report-api/short-stem-test-report-api.service';
import { tap } from 'rxjs/operators';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-short-stem-report-summary',
	templateUrl: './short-stem-report-summary.component.html'
})
export class ShortStemReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private shortStemTestReportApiService: ShortStemTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm();
		this.config = BaseReportConfiguration.initialize('Short stem tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestShortStemTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchShortStemTestSummaryReportRequest(searchCriteria);
		this.shortStemTestReportApiService.summaryReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'short_stem_report_summary.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
