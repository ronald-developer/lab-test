import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, finalize, map, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestNtrmInLineTestSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/models/request-ntrm-in-line-test-search-criteria';
import { ResponseNtrmInLineTestSearchResult } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/models/response-ntrm-in-line-test-search-result';
import { NtrmInLineTestApiService } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/ntrm-in-line-test-api.service';
import { PostSearchNtrmInLineTestRequest } from 'src/app/api-services/lab-tests/ntrm-in-line-test-api/requests/post-search-ntrm-in-line-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { LabTestsType } from '../../lab-tests-type.enum';
import { EditNtrmInLineTestsComponent } from '../edit/edit-ntrm-in-line-tests.component';
import { NtrmInLineNavigationPath } from '../navigation/ntrm-in-line-navigation-path';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-ntrm-in-line-list',
	templateUrl: './ntrm-in-line-list.component.html'
})
export class NtrmInLineListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${NtrmInLineNavigationPath.parent}/${NtrmInLineNavigationPath.children.edit}`;
	public currentRoute = `${NtrmInLineNavigationPath.parent}/${NtrmInLineNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestNtrmInLineTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseNtrmInLineTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchNtrmInLineTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private ntrmInLineTestApiService: NtrmInLineTestApiService,
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
		let searchCriteria = new RequestNtrmInLineTestSearchCriteria();

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

	public requestSearchNtrmInLineTests(criteria: RequestNtrmInLineTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmInLineTestRequest(criteria);
		return this.ntrmInLineTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditNtrmInLineTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditNtrmInLineTestsComponent;
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
			this.ntrmInLineTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.NtrmInlineTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
