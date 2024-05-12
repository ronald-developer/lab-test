import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, switchMap, tap, map, finalize } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';

import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { SandNavigationPath } from '../navigation/sand-navigation-path';
import { RequestSandTestSearchCriteria } from 'src/app/api-services/lab-tests/sand-test-api/models/request-sand-test-search-criteria';
import { ResponseSandTestSearchResult } from 'src/app/api-services/lab-tests/sand-test-api/models/response-sand-test-search-result';
import { SandTestApiService } from 'src/app/api-services/lab-tests/sand-test-api/sand-test-api.service';
import { PostSearchSandTestRequest } from 'src/app/api-services/lab-tests/sand-test-api/requests/post-search-sand-test-request';
import { EditSandTestsComponent } from '../edit/edit-sand-tests.component';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-sand-list',
	templateUrl: './sand-list.component.html'
})
export class SandListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${SandNavigationPath.parent}/${SandNavigationPath.children.edit}`;
	public currentRoute = `${SandNavigationPath.parent}/${SandNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestSandTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseSandTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchSandTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private sandTestApiService: SandTestApiService,
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
		let searchCriteria = new RequestSandTestSearchCriteria();

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

	public requestSearchSandTests(criteria: RequestSandTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchSandTestRequest(criteria);
		return this.sandTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditSandTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditSandTestsComponent;
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
			this.sandTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.SandTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
