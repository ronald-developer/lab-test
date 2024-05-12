import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { RequestBundleBusterTestSearchCriteria } from '../../../api-services/lab-tests/bundle-buster-test-api/models/request-bundle-buster-test-search-criteria';
import { ResponseBundleBusterTestSearchResult } from '../../../api-services/lab-tests/bundle-buster-test-api/models/response-bundle-buster-test-search-result';
import { PostSearchBundleBusterTestRequest } from '../../../api-services/lab-tests/bundle-buster-test-api/requests/post-search-bundle-buster-tests.-request';
import { BundleBusterTestApiService } from '../../../api-services/lab-tests/bundle-buster-test-api/bundle-buster-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { EditBundleBusterTestsComponent } from '../edit/edit-bundle-buster-tests.component';
import { BundleBusterNavigationPath } from '../navigation/bundle-buster-navigation-path';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-bundle-buster-list',
	templateUrl: './bundle-buster-list.component.html'
})
export class BundleBusterListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${BundleBusterNavigationPath.parent}/${BundleBusterNavigationPath.children.edit}`;

	public currentRoute = `${BundleBusterNavigationPath.parent}/${BundleBusterNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestBundleBusterTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseBundleBusterTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchBundleBusterTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	public formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private bundleBusterTestApiService: BundleBusterTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade, Fields.ShiftType], newFields: [Fields.PositionType] });
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
		let searchCriteria = new RequestBundleBusterTestSearchCriteria();

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

	public requestSearchBundleBusterTests(criteria: RequestBundleBusterTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchBundleBusterTestRequest(criteria);
		return this.bundleBusterTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditBundleBusterTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditBundleBusterTestsComponent;
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
			this.bundleBusterTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.BundleBusterTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
