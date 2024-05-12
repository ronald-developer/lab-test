import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { ResponseTestLastFifteenDegsDetailsReportResult } from 'src/app/api-services/lab-tests/test-last-fifteen-result-report-api/models/response-test-last-fifteen-degs-details-report-result';
import { PostGenerateTestLastFifteenDegsResultReportRequest } from 'src/app/api-services/lab-tests/test-last-fifteen-result-report-api/requests/post-generate-test-last-fifteen-degs-result-report-request';
import { TestLastFifteenResultReportApiService } from 'src/app/api-services/lab-tests/test-last-fifteen-result-report-api/test-last-fifteen-result-report-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { WarningDialogService } from 'src/app/shared/components/warning-dialog/warning-dialog.service';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-degs-dry-last-fifteen-details-list',
	templateUrl: './degs-dry-last-fifteen-details-list.component.html'
})
export class DegsDryLastFifteenDetailsListComponent extends BaseComponent implements OnInit {
	private formFilterResult!: FilterCriteriaChangeEventResult;
	dataSource$ = new Subject<number>();
	public dataSource: Observable<ResponseTestLastFifteenDegsDetailsReportResult[]> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestLastTestResult(criteria);
		}));

	public formFilter!: FormGroup;
	constructor(private testLastFifteenResultReportApiService: TestLastFifteenResultReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private warningDialogService: WarningDialogService) { super(); }


	public requestLastTestResult(operationOrderId: number) {
		this.loading(true);
		const request = new PostGenerateTestLastFifteenDegsResultReportRequest(+operationOrderId);
		return this.testLastFifteenResultReportApiService.generateDegsTestsLastFifteenResults(request).pipe(
			map(data => data.response.data),
			this.endLoading());
	}

	private hideDefaultFilterFields = [
		Fields.FromDate,
		Fields.PackingGrade,
		Fields.ShiftType,
		Fields.FilterByOperationNo,
		Fields.FilterByDate,
		Fields.IsNonCompliant];

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: this.hideDefaultFilterFields });
		this.formFilterResult = this.formFilter.value;
	}

	public onFilterCriteriaChanged(formFilterResult: FilterCriteriaChangeEventResult) {
		this.formFilterResult = formFilterResult;
	}

	public search(page: number = 1) {
		const formResult = this.formFilterResult;

		const operationOrderId = +formResult.operationOrderId;

		if (operationOrderId == 0) {
			this.showWarningDialog()
		} else {
			this.dataSource$.next(operationOrderId);
		}
	}

	showWarningDialog() {
		this.warningDialogService.showWarningDialog("Filter criteria", "Please select operation order no");
	}

}
