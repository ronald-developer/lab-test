import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { EditStemInScrapTestsComponent } from '../edit/edit-stem-in-scrap-tests.component';
import { StemInScrapNavigationPath } from '../navigation/stem-in-scrap-navigation-path';
import { RequestStemInScrapTestSearchCriteria } from './../../../api-services/lab-tests/stem-in-scrap-test-api/models/request-stem-in-scrap-test-search-criteria';
import { ResponseStemInScrapTestSearchResult } from './../../../api-services/lab-tests/stem-in-scrap-test-api/models/response-stem-in-scrap-test-search-result';
import { PostSearchStemInScrapTestRequest } from './../../../api-services/lab-tests/stem-in-scrap-test-api/requests/post-search-stem-in-scrap-test-request';
import { StemInScrapTestApiService } from './../../../api-services/lab-tests/stem-in-scrap-test-api/stem-in-scrap-test-api.service';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-stem-in-scrap-list',
	templateUrl: './stem-in-scrap-list.component.html'
})
export class StemInScrapListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${StemInScrapNavigationPath.parent}/${StemInScrapNavigationPath.children.edit}`;
	public currentRoute = `${StemInScrapNavigationPath.parent}/${StemInScrapNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestStemInScrapTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseStemInScrapTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchStemInScrapTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private stemInScrapTestApiService: StemInScrapTestApiService,
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
		let searchCriteria = new RequestStemInScrapTestSearchCriteria();

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

	public requestSearchStemInScrapTests(criteria: RequestStemInScrapTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchStemInScrapTestRequest(criteria);
		return this.stemInScrapTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditStemInScrapTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditStemInScrapTestsComponent;
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
			this.stemInScrapTestApiService.delete(testId).pipe(finalize(() => {
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
		this.ncpConfirmationService.confirmation(LabTestsType.StemInScrapTest, testId, el);
	}

}
