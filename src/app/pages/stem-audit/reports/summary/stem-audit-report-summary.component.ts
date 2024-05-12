import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap } from 'rxjs';
import { BaseReportConfig, BaseReportConfiguration } from '../../../../shared/components/base-report-template/base-report-template-config';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { Fields } from '../../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../../../shared/services/forms/portlet-filter-form-builder.service';
import { RequestStemAuditTestReportSearchCriteria } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/models/request-stem-audit-test-report-search-criteria';
import { StemAuditTestReportApiService } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/stem-audit-test-report-api.service';
import { PostSearchStemAuditTestSummaryReportRequest } from 'src/app/api-services/lab-tests/stem-audit-test-report-api/requests/post-search-stem-audit-test-summary-report-request';

@Component({
	selector: 'app-stem-audit-report-summary',
	templateUrl: './stem-audit-report-summary.component.html'
})
export class StemAuditReportSummaryComponent extends BaseComponent {
	public config!: BaseReportConfig;

	constructor(private stemAuditTestReportApiService: StemAuditTestReportApiService, private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
		const formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade,Fields.ShiftType] , newFields: [Fields.ContainerNo, Fields.SampleType]});
		this.config = BaseReportConfiguration.initialize('Stem audit tests report summary', 'Export', true, formFilter);
	}

	public export(searchCriteria: RequestStemAuditTestReportSearchCriteria) {
		this.loading(true);
		const request = new PostSearchStemAuditTestSummaryReportRequest(searchCriteria);
		this.stemAuditTestReportApiService.summaryReport(request).pipe(
			tap((x) => {
				const blob = new Blob([x], { type: 'application/xlsx' });
				saveAs(blob, 'stem_audit_report_summary.xlsx');
			}),
			this.endLoading()).subscribe();
	}
}
