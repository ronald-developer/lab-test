import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { EditShortStemTestsComponent } from '../edit/edit-short-stem-tests.component';
import { ShortStemNavigationPath } from '../navigation/short-stem-navigation-path';
import { RequestShortStemTestSearchCriteria } from './../../../api-services/lab-tests/short-stem-test-api/models/request-short-stem-test-search-criteria';
import { ResponseShortStemTestSearchResult } from './../../../api-services/lab-tests/short-stem-test-api/models/response-short-stem-test-search-result';
import { PostSearchShortStemTestRequest } from './../../../api-services/lab-tests/short-stem-test-api/requests/post-search-short-stem-tests.-request';
import { ShortStemTestApiService } from './../../../api-services/lab-tests/short-stem-test-api/short-stem-test-api.service';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { FormGroup } from '@angular/forms';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-short-stem-list',
	templateUrl: './short-stem-list.component.html'
})
export class ShortStemListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${ShortStemNavigationPath.parent}/${ShortStemNavigationPath.children.edit}`;
	public currentRoute = `${ShortStemNavigationPath.parent}/${ShortStemNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestShortStemTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseShortStemTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchShortStemTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public excludeFilterFields: Fields[] = [Fields.CartonNo, Fields.ChargerType];
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private shortStemTestApiService: ShortStemTestApiService, private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}


	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ newFields: [Fields.ScreenType] });
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
		let searchCriteria = new RequestShortStemTestSearchCriteria();

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

	public requestSearchShortStemTests(criteria: RequestShortStemTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchShortStemTestRequest(criteria);
		return this.shortStemTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditShortStemTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditShortStemTestsComponent;
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
			this.shortStemTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.ShortStemTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
