import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, finalize, map, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestNtrmProductTestSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-product-test-api/models/request-ntrm-product-test-search-criteria';
import { ResponseNtrmProductTestSearchResult } from 'src/app/api-services/lab-tests/ntrm-product-test-api/models/response-ntrm-product-test-search-result';
import { NtrmProductTestApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-api/ntrm-product-test-api.service';
import { PostSearchNtrmProductTestRequest } from 'src/app/api-services/lab-tests/ntrm-product-test-api/requests/post-search-ntrm-product-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { NtrmProductNavigationPath } from '../navigation/ntrm-product-navigation-path';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { saveAs } from 'file-saver';
import { NtrmProductTestReportApiService } from 'src/app/api-services/lab-tests/ntrm-product-test-report-api/ntrm-product-test-report-api.service';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { EditNtrmProductTestsComponent } from '../edit/edit-ntrm-product-tests.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-ntrm-product-list',
	templateUrl: './ntrm-product-list.component.html'
})
export class NtrmProductListComponent extends BaseComponent implements AfterViewInit, OnInit {
	dataSource$ = new Subject<RequestNtrmProductTestSearchCriteria>();
	public editRoute = `${NtrmProductNavigationPath.parent}/${NtrmProductNavigationPath.children.edit}`;
	public currentRoute = `${NtrmProductNavigationPath.parent}/${NtrmProductNavigationPath.children.list}`;
	public dataSource: Observable<PagedResult<ResponseNtrmProductTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchNtrmProductTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private ntrmProductTestApiService: NtrmProductTestApiService,
		private ntrmProductTestReportApiService: NtrmProductTestReportApiService,
		private modalService: NgbModal,
		private router: Router,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.ShiftType, Fields.PackingGrade] });
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
		let searchCriteria = new RequestNtrmProductTestSearchCriteria();

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

	public requestSearchNtrmProductTests(criteria: RequestNtrmProductTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmProductTestRequest(criteria);
		return this.ntrmProductTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditNtrmProductTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditNtrmProductTestsComponent;
		instance.testId = testId;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		});
	}

	public delete(testId: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'md', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as ConfirmationDialogComponent;
		instance.confirmAction(() => {
			this.loading(true);
			this.ntrmProductTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.NtrmProductTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
