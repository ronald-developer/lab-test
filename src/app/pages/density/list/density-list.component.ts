import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { DensityTestApiService } from '../../../api-services/lab-tests/density-test-api/density-test-api.service';
import { RequestDensityTestSearchCriteria } from '../../../api-services/lab-tests/density-test-api/models/request-density-test-search-criteria';
import { ResponseDensityTestSearchResult } from '../../../api-services/lab-tests/density-test-api/models/response-density-test-search-result';
import { PostSearchDensityTestRequest } from '../../../api-services/lab-tests/density-test-api/requests/post-search-density-test-request';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { EditDensityTestsComponent } from '../edit/edit-density-tests.component';
import { DensityNavigationPath } from '../navigation/density-navigation-path';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-density-list',
	templateUrl: './density-list.component.html'
})
export class DensityListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${DensityNavigationPath.parent}/${DensityNavigationPath.children.edit}`;
	public currentRoute = `${DensityNavigationPath.parent}/${DensityNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestDensityTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseDensityTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchDensityTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private densityTestApiService: DensityTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();

	}
	public formFilter!: FormGroup;
	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade], newFields: [Fields.CartonNo, Fields.ChargerType] });
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
		const cartonNo = formResult.cartonNo == '' ? null : formResult.cartonNo
		let searchCriteria = new RequestDensityTestSearchCriteria();
		const dateRange: [Date, Date] = formResult?.dateSearch ? formResult?.fromDate : [dateNow, dateNow];
		searchCriteria = {
			...formResult,
			cartonNo: cartonNo,
			dateSearch: formResult?.dateSearch,
			fromDate: new Date(dateRange[0].toUTCString()),
			toDate: new Date(dateRange[1].toUTCString()),
			page: page,
			pageSize: this.defaultPageSize
		}
		return searchCriteria;
	}

	public requestSearchDensityTests(criteria: RequestDensityTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchDensityTestRequest(criteria);
		return this.densityTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditDensityTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditDensityTestsComponent;
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
			this.densityTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.DensityTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
