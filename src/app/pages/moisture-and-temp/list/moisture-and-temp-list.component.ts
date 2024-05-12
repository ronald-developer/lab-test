import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { Subject, Observable, switchMap, tap, map, finalize } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestMoistureAndTempTestSearchCriteria } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/models/request-moisture-and-temp-test-search-criteria';
import { ResponseMoistureAndTempTestSearchResult } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/models/response-moisture-and-temp-test-search-result';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { MoistureAndTempNavigationPath } from '../navigation/moisture-and-temp-navigation-path';
import { MoistureAndTempTestApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/moisture-and-temp-test-api.service';
import { MoistureAndTempTestReportApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-report-api/moisture-and-temp-test-report-api.service';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { PostSearchMoistureAndTempTestRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/requests/post-search-moisture-and-temp-test-request';
import { EditMoistureAndTempTestsComponent } from '../edit/edit-moisture-and-temp-tests.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-moisture-and-temp-list',
	templateUrl: './moisture-and-temp-list.component.html'
})
export class MoistureAndTempListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${MoistureAndTempNavigationPath.parent}/${MoistureAndTempNavigationPath.children.edit}`;
	public currentRoute = `${MoistureAndTempNavigationPath.parent}/${MoistureAndTempNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestMoistureAndTempTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseMoistureAndTempTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchMoistureAndTempTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private moistureAndTempTestApiService: MoistureAndTempTestApiService,
		private moistureAndTempTestReportApiService: MoistureAndTempTestReportApiService,
		private modalService: NgbModal,
		private router: Router,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.formFilterResult = this.formFilter.value;
	}

	ngAfterViewInit(): void {
		this.search(1);
	}

	public onFilterCriteriaChanged(formFilterResult: FilterCriteriaChangeEventResult) {
		this.formFilterResult = formFilterResult;
	}

	private getSearchCriteria(page: number = 1) {
		const formResult = this.formFilterResult;
		const now = new Date();
		const dateNow = DateTimeHelper.getDateTimezoneOffset(new Date(now.toUTCString()));
		let searchCriteria = new RequestMoistureAndTempTestSearchCriteria();

		const dateRange: [Date, Date] = formResult?.dateSearch ? formResult?.fromDate : [dateNow, dateNow];
		searchCriteria = {
			...formResult,
			dateSearch: formResult?.dateSearch,
			fromDate: new Date(dateRange[0].toUTCString()),
			toDate: new Date(dateRange[1].toUTCString()),
			page: page,
			pageSize: this.defaultPageSize
		}
		return searchCriteria;
	}

	public requestSearchMoistureAndTempTests(criteria: RequestMoistureAndTempTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchMoistureAndTempTestRequest(criteria);
		return this.moistureAndTempTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditMoistureAndTempTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditMoistureAndTempTestsComponent;
		instance.testId = testId;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		});
	}

	public upload(batchId: string) {
		const route = `/${MoistureAndTempNavigationPath.parent}/${batchId}/${MoistureAndTempNavigationPath.children.upload}`;
		this.router.navigateByUrl(route);
	}

	public delete(testId: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'md', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as ConfirmationDialogComponent;
		instance.confirmAction(() => {
			this.loading(true);
			this.moistureAndTempTestApiService.delete(testId).pipe(finalize(() => {
				instance.close();
				this.search();
			}), this.endLoading()).subscribe(data => {
				this.toastr.success('Test deleted', 'Success!');
			});
		});

		instance.declineAction(() => {
			instance.close();
		});
	}

	public confirmation(testId: string, el: HTMLInputElement) {
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.MoistureAndTempTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
