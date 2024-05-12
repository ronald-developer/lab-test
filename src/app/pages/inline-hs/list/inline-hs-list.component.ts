import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { RequestInlineHsTestSearchCriteria } from '../../../api-services/lab-tests/inline-hs-test-api/models/request-inline-hs-test-search-criteria';
import { ResponseInlineHsTestSearchResult } from '../../../api-services/lab-tests/inline-hs-test-api/models/response-inline-hs-test-search-result';
import { PostSearchInlineHsTestRequest } from '../../../api-services/lab-tests/inline-hs-test-api/requests/post-search-inline-hs-test-request';
import { InlineHsTestApiService } from '../../../api-services/lab-tests/inline-hs-test-api/inline-hs-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { EditInlineHsTestsComponent } from '../edit/edit-inline-hs-tests.component';
import { InlineHsNavigationPath } from '../navigation/inline-hs-navigation-path';
import { FormGroup } from '@angular/forms';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-inline-hs-list',
	templateUrl: './inline-hs-list.component.html'
})
export class InlineHsListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${InlineHsNavigationPath.parent}/${InlineHsNavigationPath.children.edit}`;
	public currentRoute = `${InlineHsNavigationPath.parent}/${InlineHsNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestInlineHsTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseInlineHsTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchInlineHsTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private inlineHsTestApiService: InlineHsTestApiService,
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
		let searchCriteria = new RequestInlineHsTestSearchCriteria();
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

	public requestSearchInlineHsTests(criteria: RequestInlineHsTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchInlineHsTestRequest(criteria);
		return this.inlineHsTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditInlineHsTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditInlineHsTestsComponent;
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
			this.inlineHsTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.InlineHsTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
