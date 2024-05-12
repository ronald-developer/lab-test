import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, switchMap, tap, map, finalize } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { FinesTestApiService } from 'src/app/api-services/lab-tests/fines-test-api/fines-test-api.service';
import { RequestFinesTestSearchCriteria } from 'src/app/api-services/lab-tests/fines-test-api/models/request-fines-test-search-criteria';
import { ResponseFinesTestSearchResult } from 'src/app/api-services/lab-tests/fines-test-api/models/response-fines-test-search-result';
import { PostSearchFinesTestRequest } from 'src/app/api-services/lab-tests/fines-test-api/requests/post-search-fines-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { EditFinesTestsComponent } from '../edit/edit-fines-tests.component';
import { FinesNavigationPath } from '../navigation/fines-navigation-path';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-fines-list',
	templateUrl: './fines-list.component.html'
})
export class FinesListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${FinesNavigationPath.parent}/${FinesNavigationPath.children.edit}`;
	public currentRoute = `${FinesNavigationPath.parent}/${FinesNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestFinesTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseFinesTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchFinesTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private finesTestApiService: FinesTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm();
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
		let searchCriteria = new RequestFinesTestSearchCriteria();

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

	public requestSearchFinesTests(criteria: RequestFinesTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchFinesTestRequest(criteria);
		return this.finesTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditFinesTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditFinesTestsComponent;
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
			this.finesTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.FinesTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
