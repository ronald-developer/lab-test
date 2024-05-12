import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PagedResult } from '../../../api-services/common-models/paged-result';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { LabTestsType } from '../../lab-tests-type.enum';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { RequestStemAuditTestSearchCriteria } from 'src/app/api-services/lab-tests/stem-audit-test-api/models/request-stem-audit-test-search-criteria';
import { ResponseStemAuditTestSearchResult } from 'src/app/api-services/lab-tests/stem-audit-test-api/models/response-stem-audit-test-search-result';
import { StemAuditTestApiService } from 'src/app/api-services/lab-tests/stem-audit-test-api/stem-audit-test-api.service';
import { PostSearchStemAuditTestRequest } from 'src/app/api-services/lab-tests/stem-audit-test-api/requests/post-search-stem-audit-test-request';
import { EditStemAuditTestsComponent } from '../edit/edit-stem-audit-tests.component';
import { StemAuditNavigationPath } from '../navigation/stem-audit-navigation-path';

@Component({
	selector: 'app-stem-audit-list',
	templateUrl: './stem-audit-list.component.html'
})
export class StemAuditListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${StemAuditNavigationPath.parent}/${StemAuditNavigationPath.children.edit}`;
	public currentRoute = `${StemAuditNavigationPath.parent}/${StemAuditNavigationPath.children.list}`;
	dataSource$ = new Subject<RequestStemAuditTestSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseStemAuditTestSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchStemAuditTests(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private stemAuditTestApiService: StemAuditTestApiService,
		private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();

	}
	public formFilter!: FormGroup;
	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: [Fields.PackingGrade, Fields.ShiftType], newFields: [Fields.ContainerNo, Fields.SampleType] });
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
		const sampleType = formResult.cartonNo == '' ? null : formResult.cartonNo
		let searchCriteria = new RequestStemAuditTestSearchCriteria();
		const dateRange: [Date, Date] = formResult?.dateSearch ? formResult?.fromDate : [dateNow, dateNow];
		searchCriteria = {
			...formResult,
			sampleType: sampleType,
			dateSearch: formResult?.dateSearch,
			fromDate: new Date(dateRange[0].toUTCString()),
			toDate: new Date(dateRange[1].toUTCString()),
			page: page,
			pageSize: this.defaultPageSize
		}
		return searchCriteria;
	}

	public requestSearchStemAuditTests(criteria: RequestStemAuditTestSearchCriteria) {
		this.loading(true);
		const request = new PostSearchStemAuditTestRequest(criteria);
		return this.stemAuditTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditStemAuditTestsComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditStemAuditTestsComponent;
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
			this.stemAuditTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.StemAuditTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}

}
