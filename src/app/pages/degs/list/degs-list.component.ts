import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { DegsNavigationPath } from '../navigation/degs-navigation-path';
import { RequestDegsTestSearchCriteria } from 'src/app/api-services/lab-tests/degs-test-api/models/request-degs-test-search-criteria';
import { Observable, Subject, finalize, map, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { ResponseDegsTestSearchResult } from 'src/app/api-services/lab-tests/degs-test-api/models/response-degs-test-search-result';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { FormGroup } from '@angular/forms';
import { DegsTestApiService } from 'src/app/api-services/lab-tests/degs-test-api/degs-test-api.service';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { PostSearchDegsTestRequest } from 'src/app/api-services/lab-tests/degs-test-api/requests/post-search-degs-test-request';
import { EditDegsTestsComponent } from '../edit/edit-degs-tests.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestType } from 'src/app/shared/models/test-type';
import { EditStemDegsTestsComponent } from '../edit/edit-stem-degs-tests.component';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-degs-list',
	templateUrl: './degs-list.component.html'
})
export class DegsListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${DegsNavigationPath.parent}/${DegsNavigationPath.children.edit}`;
	public currentRoute = `${DegsNavigationPath.parent}/${DegsNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestDegsTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseDegsTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchDegsTests(criteria);
		}));

	public testType = TestType;
	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private degsTestApiService: DegsTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}
	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm(
			{
				hideDefaultFields: [Fields.PackingGrade],
				newFields: [Fields.CartonNo, Fields.TestType]
			});
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
		let searchCriteria = new RequestDegsTestSearchCriteria();

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

	public requestSearchDegsTests(criteria: RequestDegsTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchDegsTestRequest(criteria);
		return this.degsTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditDegsTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditDegsTestsComponent;
		instance.testId = testId;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		})
	}

	public editStemDegs(testId: string) {
		const modalRef = this.modalService.open(EditStemDegsTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditStemDegsTestsComponent;
		instance.testId = testId;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		})
	}

	public delete(testId: string) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'md', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as ConfirmationDialogComponent;
		instance.confirmAction(() => {
			this.loading(true);
			this.degsTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.DegsTest, testId, el);
		isSuccess.subscribe(success => {
			if(success){
				this.search();
			}
		});
	}
}
