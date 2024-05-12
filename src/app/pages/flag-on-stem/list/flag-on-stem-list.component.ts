import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from './../../../api-services/common-models/paged-result';
import { BaseComponent } from './../../../shared/components/base/base.component';
import { EditFlagOnStemTestsComponent } from '../edit/edit-flag-on-stem-tests.component';
import { FlagOnStemNavigationPath } from '../navigation/flag-on-stem-navigation-path';
import { RequestFlagOnStemTestSearchCriteria } from './../../../api-services/lab-tests/flag-on-stem-test-api/models/request-flag-on-stem-test-search-criteria';
import { ResponseFlagOnStemTestSearchResult } from './../../../api-services/lab-tests/flag-on-stem-test-api/models/response-flag-on-stem-test-search-result';
import { PostSearchFlagOnStemTestRequest } from './../../../api-services/lab-tests/flag-on-stem-test-api/requests/post-search-flag-on-stem-tests.-request';
import { FlagOnStemTestApiService } from './../../../api-services/lab-tests/flag-on-stem-test-api/flag-on-stem-test-api.service';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { Fields } from './../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from './../../../shared/services/forms/portlet-filter-form-builder.service';
import { FormGroup } from '@angular/forms';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-flag-on-stem-list',
	templateUrl: './flag-on-stem-list.component.html'
})
export class FlagOnStemListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${FlagOnStemNavigationPath.parent}/${FlagOnStemNavigationPath.children.edit}`;
	public currentRoute = `${FlagOnStemNavigationPath.parent}/${FlagOnStemNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestFlagOnStemTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseFlagOnStemTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchFlagOnStemTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private flagOnStemTestApiService: FlagOnStemTestApiService,
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
		let searchCriteria = new RequestFlagOnStemTestSearchCriteria();

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

	public requestSearchFlagOnStemTests(criteria: RequestFlagOnStemTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchFlagOnStemTestRequest(criteria);
		return this.flagOnStemTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditFlagOnStemTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditFlagOnStemTestsComponent;
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
			this.flagOnStemTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.FlagOnStemTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
