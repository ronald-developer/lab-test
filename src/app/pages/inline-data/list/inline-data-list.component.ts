import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { InlineDataTestApiService } from 'src/app/api-services/lab-tests/inline-data-test-api/inline-data-test-api.service';
import { RequestInlineDataTestSearchCriteria } from 'src/app/api-services/lab-tests/inline-data-test-api/models/request-inline-data-test-search-criteria';
import { ResponseInlineDataTestSearchResult } from 'src/app/api-services/lab-tests/inline-data-test-api/models/response-inline-data-test-search-result';
import { PostSearchInlineDataTestRequest } from 'src/app/api-services/lab-tests/inline-data-test-api/requests/post-search-inline-data-test-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { EditInlineDataTestsComponent } from '../edit/edit-inline-data-tests.component';
import { InlineDataNavigationPath } from '../navigation/inline-data-navigation-path';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-inline-data-list',
	templateUrl: './inline-data-list.component.html'
})
export class InlineDataListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${InlineDataNavigationPath.parent}/${InlineDataNavigationPath.children.edit}`;
	public currentRoute = `${InlineDataNavigationPath.parent}/${InlineDataNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestInlineDataTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseInlineDataTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchInlineDataTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private inlineDataTestApiService: InlineDataTestApiService,
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
		let searchCriteria = new RequestInlineDataTestSearchCriteria();

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

	public requestSearchInlineDataTests(criteria: RequestInlineDataTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchInlineDataTestRequest(criteria);
		return this.inlineDataTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditInlineDataTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditInlineDataTestsComponent;
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
			this.inlineDataTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.InlineDataTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
