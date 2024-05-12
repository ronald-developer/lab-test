import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { EditStemDiameterTestsComponent } from '../edit/edit-stem-diameter-tests.component';
import { StemDiameterNavigationPath } from '../navigation/stem-diameter-navigation-path';
import { RequestStemDiameterTestSearchCriteria } from './../../../api-services/lab-tests/stem-diameter-test-api/models/request-stem-diameter-test-search-criteria';
import { ResponseStemDiameterTestSearchResult } from './../../../api-services/lab-tests/stem-diameter-test-api/models/response-stem-diameter-test-search-result';
import { PostSearchStemDiameterTestRequest } from './../../../api-services/lab-tests/stem-diameter-test-api/requests/post-search-stem-diameter-test-request';
import { StemDiameterTestApiService } from './../../../api-services/lab-tests/stem-diameter-test-api/stem-diameter-test-api.service';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-stem-diameter-list',
	templateUrl: './stem-diameter-list.component.html'
})
export class StemDiameterListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${StemDiameterNavigationPath.parent}/${StemDiameterNavigationPath.children.edit}`;
	public currentRoute = `${StemDiameterNavigationPath.parent}/${StemDiameterNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestStemDiameterTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseStemDiameterTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchStemDiameterTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	public formFilter!: FormGroup;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private stemDiameterTestApiService: StemDiameterTestApiService,
		private modalService: NgbModal,
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
		let searchCriteria = new RequestStemDiameterTestSearchCriteria();

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

	public requestSearchStemDiameterTests(criteria: RequestStemDiameterTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchStemDiameterTestRequest(criteria);
		return this.stemDiameterTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditStemDiameterTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditStemDiameterTestsComponent;
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
			this.stemDiameterTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.StemDiameterTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
