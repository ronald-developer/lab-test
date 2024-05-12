import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, switchMap, tap, map, finalize } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestNtrmGreenTestSearchCriteria } from 'src/app/api-services/lab-tests/ntrm-green-test-api/models/request-ntrm-green-test-search-criteria';
import { ResponseNtrmGreenTestSearchResult } from 'src/app/api-services/lab-tests/ntrm-green-test-api/models/response-ntrm-green-test-search-result';
import { PostSearchNtrmGreenTestRequest } from 'src/app/api-services/lab-tests/ntrm-green-test-api/requests/post-search-ntrm-green-test-request';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { EditNtrmGreenTestsComponent } from '../edit/edit-ntrm-green-tests.component';
import { NtrmGreenNavigationPath } from '../navigation/ntrm-green-navigation-path';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { NtrmGreenTestApiService } from 'src/app/api-services/lab-tests/ntrm-green-test-api/ntrm-green-test-api.service';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-ntrm-green-list',
	templateUrl: './ntrm-green-list.component.html'
})
export class NtrmGreenListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${NtrmGreenNavigationPath.parent}/${NtrmGreenNavigationPath.children.edit}`;
	public currentRoute = `${NtrmGreenNavigationPath.parent}/${NtrmGreenNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestNtrmGreenTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseNtrmGreenTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchNtrmGreenTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private ntrmGreenTestApiService: NtrmGreenTestApiService, private modalService: NgbModal,
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
		let searchCriteria = new RequestNtrmGreenTestSearchCriteria();

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

	public requestSearchNtrmGreenTests(criteria: RequestNtrmGreenTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmGreenTestRequest(criteria);
		return this.ntrmGreenTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditNtrmGreenTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditNtrmGreenTestsComponent;
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
			this.ntrmGreenTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.NtrmGreenTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
