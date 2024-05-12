import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ShakerEfficiencyNavigationPath } from '../navigation/shaker-efficiency-navigation-path';
import { RequestShakerEfficiencyTestSearchCriteria } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/models/request-shaker-efficiency-test-search-criteria';
import { ResponseShakerEfficiencyTestSearchResult } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/models/response-shaker-efficiency-test-search-result';
import { PostSearchShakerEfficiencyTestRequest } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/requests/post-search-shaker-efficiency-tests.-request';
import { EditShakerEfficiencyTestsComponent } from '../edit/edit-shaker-efficiency-tests.component';
import { ShakerEfficiencyTestApiService } from 'src/app/api-services/lab-tests/shaker-efficiency-test-api/shaker-efficiency-test-api.service';

@Component({
	selector: 'app-shaker-efficiency-list',
	templateUrl: './shaker-efficiency-list.component.html'
})
export class ShakerEfficiencyListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${ShakerEfficiencyNavigationPath.parent}/${ShakerEfficiencyNavigationPath.children.edit}`;

	public currentRoute = `${ShakerEfficiencyNavigationPath.parent}/${ShakerEfficiencyNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestShakerEfficiencyTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseShakerEfficiencyTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchShakerEfficiencyTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private shakerEfficiencyTestApiService: ShakerEfficiencyTestApiService, private modalService: NgbModal,
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
		let searchCriteria = new RequestShakerEfficiencyTestSearchCriteria();

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

	public requestSearchShakerEfficiencyTests(criteria: RequestShakerEfficiencyTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchShakerEfficiencyTestRequest(criteria);
		return this.shakerEfficiencyTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditShakerEfficiencyTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditShakerEfficiencyTestsComponent;
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
			this.shakerEfficiencyTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.ShakerEfficiencyTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
