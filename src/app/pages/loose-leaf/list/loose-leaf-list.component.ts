import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PostSearchLooseLeafTestRequest } from '../../../api-services/lab-tests/loose-leaf-test-api/requests/post-search-loose-leaf-test-request';
import { EditLooseLeafTestsComponent } from '../edit/edit-loose-leaf-tests.component';
import { LooseLeafNavigationPath } from '../navigation/loose-leaf-navigation-path';
import { LooseLeafTestApiService } from './../../../api-services/lab-tests/loose-leaf-test-api/loose-leaf-test-api.service';
import { RequestLooseLeafTestSearchCriteria } from './../../../api-services/lab-tests/loose-leaf-test-api/models/request-loose-leaf-test-search-criteria';
import { ResponseLooseLeafTestSearchResult } from './../../../api-services/lab-tests/loose-leaf-test-api/models/response-loose-leaf-test-search-result';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-loose-leaf-list',
	templateUrl: './loose-leaf-list.component.html'
})
export class LooseLeafListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${LooseLeafNavigationPath.parent}/${LooseLeafNavigationPath.children.edit}`;
	public currentRoute = `${LooseLeafNavigationPath.parent}/${LooseLeafNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestLooseLeafTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseLooseLeafTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchLooseLeafTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private LooseLeafTestApiService: LooseLeafTestApiService,
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
		let searchCriteria = new RequestLooseLeafTestSearchCriteria();

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

	public requestSearchLooseLeafTests(criteria: RequestLooseLeafTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchLooseLeafTestRequest(criteria);
		return this.LooseLeafTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditLooseLeafTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditLooseLeafTestsComponent;
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
			this.LooseLeafTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.LooseLeafTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
