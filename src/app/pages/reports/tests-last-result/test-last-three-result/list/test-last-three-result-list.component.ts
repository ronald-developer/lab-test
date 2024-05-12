import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { RequestTestLastThreeResultReportCriteria } from 'src/app/api-services/lab-tests/test-last-three-result-report-api/models/request-test-last-three-result-report-criteria';
import { ResponseTestTypesReportLastResult } from 'src/app/api-services/lab-tests/test-last-three-result-report-api/models/response-test-types-report-last-result';
import { PostGenerateTestLastThreeResultReportRequest } from 'src/app/api-services/lab-tests/test-last-three-result-report-api/requests/post-generate-test-last-three-result-report-request';
import { TestLastThreeResultReportApiService } from 'src/app/api-services/lab-tests/test-last-three-result-report-api/test-last-three-result-report-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { WarningDialogComponent } from 'src/app/shared/components/warning-dialog/warning-dialog.component';
import { WarningDialogService } from 'src/app/shared/components/warning-dialog/warning-dialog.service';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

@Component({
	selector: 'app-test-last-three-result-list',
	templateUrl: './test-last-three-result-list.component.html'
})
export class TestLastThreeResultListComponent extends BaseComponent implements OnInit {
	public columnCount: number = 3;
	public enableNavPagination!: boolean;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	dataSource$ = new Subject<RequestTestLastThreeResultReportCriteria>();
	public dataSource: Observable<ResponseTestTypesReportLastResult> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestLastTestResult(criteria);
		}));

	public formFilter!: FormGroup;

	constructor(private testLastThreeResultReportApiService: TestLastThreeResultReportApiService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private warningDialogService: WarningDialogService) {
		super();
	}

	public requestLastTestResult(criteria: RequestTestLastThreeResultReportCriteria) {
		this.loading(true);
		const request = new PostGenerateTestLastThreeResultReportRequest(criteria);
		return this.testLastThreeResultReportApiService.generateTestsLastThreeResults(request).pipe(
			map(data => data.response.data),
			tap(data => this.enableNavPagination = true),
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
		this.columnCount = page * 3;
		const formResult = this.formFilterResult;
		const operationOrderId = +formResult.operationOrderId;
		const criteria = new RequestTestLastThreeResultReportCriteria(operationOrderId, page);

		if (operationOrderId == 0) {
			this.showWarningDialog();
		} else {
			this.dataSource$.next(criteria);
		}
	}

	public get columns() {
		return Array.from({ length: this.columnCount }, (_, index) => index + 1);
	}

	showWarningDialog() {
		this.warningDialogService.showWarningDialog("Filter criteria", "Please select operation order no");
	}

}
