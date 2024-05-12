import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { EditLeavesTestsComponent } from '../edit/edit-leaves-tests.component';
import { LeavesNavigationPath } from '../navigation/leaves-navigation-path';
import { RequestLeavesTestSearchCriteria } from './../../../api-services/lab-tests/leaves-test-api/models/request-leaves-test-search-criteria';
import { ResponseLeavesTestSearchResult } from './../../../api-services/lab-tests/leaves-test-api/models/response-leaves-test-search-result';
import { LeavesTestApiService } from './../../../api-services/lab-tests/leaves-test-api/leaves-test-api.service';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PostSearchLeavesTestRequest } from '../../../api-services/lab-tests/leaves-test-api/requests/post-search-leaves-test-request';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { FormGroup } from '@angular/forms';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-leaves-list',
	templateUrl: './leaves-list.component.html'
})
export class LeavesListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${LeavesNavigationPath.parent}/${LeavesNavigationPath.children.edit}`;
	public currentRoute = `${LeavesNavigationPath.parent}/${LeavesNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestLeavesTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseLeavesTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchLeavesTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private leavesTestApiService: LeavesTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
		this.formFilterResult = this.formFilter.value;
	}

	ngAfterViewInit(): void {
		this.search();
	}

	public onFilterCriteriaChanged(formFilterResult: FilterCriteriaChangeEventResult) {
		this.formFilterResult = formFilterResult;
	}

	private getSearchCriteria(page: number = 1) {
		const formResult = this.formFilterResult;
		const now = new Date();
		const dateNow = DateTimeHelper.getDateTimezoneOffset(new Date(now.toUTCString()));
		let searchCriteria = new RequestLeavesTestSearchCriteria();
		const dateRange: [Date, Date] = formResult?.dateSearch ? formResult?.fromDate : [dateNow, dateNow];
		searchCriteria = {
			...formResult,
			dateSearch: formResult.dateSearch,
			fromDate: new Date(dateRange[0].toUTCString()),
			toDate: new Date(dateRange[1].toUTCString()),
			page: page,
			pageSize: this.defaultPageSize
		}
		return searchCriteria;
	}

	public requestSearchLeavesTests(criteria: RequestLeavesTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchLeavesTestRequest(criteria);
		return this.leavesTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditLeavesTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditLeavesTestsComponent;
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
			this.leavesTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.LeavesTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
