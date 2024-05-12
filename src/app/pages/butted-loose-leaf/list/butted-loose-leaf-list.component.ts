import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, finalize, map, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { UiBlockingService } from 'src/app/core/services/ui-blocking.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { PostSearchButtedLooseLeafTestRequest } from '../../../api-services/lab-tests/butted-loose-leaf-test-api/requests/post-search-butted-loose-leaf-test-request';
import { Fields } from '../../../shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { EditButtedLooseLeafTestsComponent } from '../edit/edit-butted-loose-leaf-tests.component';
import { ButtedLooseLeafNavigationPath } from '../navigation/butted-loose-leaf-navigation-path';
import { ButtedLooseLeafTestApiService } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/butted-loose-leaf-test-api.service';
import { RequestButtedLooseLeafTestSearchCriteria } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/models/request-butted-loose-leaf-test-search-criteria';
import { ResponseButtedLooseLeafTestSearchResult } from './../../../api-services/lab-tests/butted-loose-leaf-test-api/models/response-butted-loose-leaf-test-search-result';
import { FilterCriteriaChangeEventResult } from './../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from './../../../utils/date-time-helper-utils';

@Component({
	selector: 'app-butted-loose-leaf-list',
	templateUrl: './butted-loose-leaf-list.component.html'
})
export class ButtedLooseLeafListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${ButtedLooseLeafNavigationPath.parent}/${ButtedLooseLeafNavigationPath.children.edit}`;
	public currentRoute = `${ButtedLooseLeafNavigationPath.parent}/${ButtedLooseLeafNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestButtedLooseLeafTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseButtedLooseLeafTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchButtedLooseLeafTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	formFilter!: FormGroup;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private buttedLooseLeafTestApiService: ButtedLooseLeafTestApiService,
		private uiBlockingService: UiBlockingService,
		private modalService: NgbModal,

		private toastr: ToastrService,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService) {
		super();
	}
	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade] });
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
		let searchCriteria = new RequestButtedLooseLeafTestSearchCriteria();
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

	public requestSearchButtedLooseLeafTests(criteria: RequestButtedLooseLeafTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchButtedLooseLeafTestRequest(criteria);
		return this.buttedLooseLeafTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditButtedLooseLeafTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditButtedLooseLeafTestsComponent;
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
			this.buttedLooseLeafTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.ButtedLooseLeafTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
