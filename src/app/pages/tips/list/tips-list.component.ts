import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { RequestTipsTestSearchCriteria } from '../../../api-services/lab-tests/tips-test-api/models/request-tips-test-search-criteria';
import { ResponseTipsTestSearchResult } from '../../../api-services/lab-tests/tips-test-api/models/response-tips-test-search-result';
import { PostSearchTipsTestRequest } from '../../../api-services/lab-tests/tips-test-api/requests/post-search-tips-tests.-request';
import { TipsTestApiService } from '../../../api-services/lab-tests/tips-test-api/tips-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { EditTipsTestsComponent } from '../edit/edit-tips-tests.component';
import { TipsNavigationPath } from '../navigation/tips-navigation-path';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-tips-list',
	templateUrl: './tips-list.component.html'
})
export class TipsListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${TipsNavigationPath.parent}/${TipsNavigationPath.children.edit}`;

	public currentRoute = `${TipsNavigationPath.parent}/${TipsNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestTipsTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseTipsTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchTipsTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private tipsTestApiService: TipsTestApiService, private modalService: NgbModal,
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
		let searchCriteria = new RequestTipsTestSearchCriteria();

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

	public requestSearchTipsTests(criteria: RequestTipsTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchTipsTestRequest(criteria);
		return this.tipsTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditTipsTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditTipsTestsComponent;
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
			this.tipsTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.TipsTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
