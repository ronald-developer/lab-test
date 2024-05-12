import { BaseComponent } from './../../../../shared/components/base/base.component';
import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { FlagOnStemTestReportApiService } from './../../../../api-services/lab-tests/flag-on-stem-test-report-api/flag-on-stem-test-report-api.service';
import { RequestFlagOnStemTestReportSearchCriteria } from './../../../../api-services/lab-tests/flag-on-stem-test-report-api/models/request-flag-on-stem-test-report-search-criteria';
import { PostSearchFlagOnStemTestDetailsReportRequest } from './../../../../api-services/lab-tests/flag-on-stem-test-report-api/requests/post-search-flag-on-stem-test-details-report-request';
import { tap } from 'rxjs/operators';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-flag-on-stem-report-details',
	templateUrl: './flag-on-stem-report-details.component.html'
})
export class FlagOnStemReportDetailsComponent extends BaseComponent {
	public config!: BaseReportConfig;
	constructor(private flagOnStemTestReportApiService: FlagOnStemTestReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.config = BaseReportConfiguration.initialize('Flag on stem tests report details', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestFlagOnStemTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchFlagOnStemTestDetailsReportRequest(searchCriteria);
		this.flagOnStemTestReportApiService.detailsReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'flag_on_stem_report_details.xlsx');
			}), this.endLoading()).subscribe();
	}
}
