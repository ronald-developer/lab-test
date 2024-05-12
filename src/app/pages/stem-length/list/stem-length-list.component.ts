import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, Subject, switchMap, tap } from 'rxjs';
import { RequestStemLengthTestSearchCriteria } from '../../../api-services/lab-tests/stem-length-test-api/models/request-stem-length-test-search-criteria';
import { PostSearchStemLengthTestsRequest } from '../../../api-services/lab-tests/stem-length-test-api/requests/post-search-stem-length-tests-request';
import { StemLengthTestApiService } from '../../../api-services/lab-tests/stem-length-test-api/stem-length-test-api.service';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { FilterCriteriaChangeEventResult } from '../../../shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from '../../../shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from '../../../utils/date-time-helper-utils';
import { EditStemLengthTestComponent } from '../edit/edit-stem-length-test.component';
import { StemLengthNavigationPath } from '../navigation/stem-length-navigation-path';
import { LabTestsType } from '../../lab-tests-type.enum';
import { NcpConfirmationService } from 'src/app/shared/services/ncp/ncp-confirmation.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-stem-length-list',
	templateUrl: './stem-length-list.component.html'
})
export class StemLengthListComponent extends BaseComponent implements AfterViewInit, OnInit {
	dataSource$ = new Subject<RequestStemLengthTestSearchCriteria>();
	public dataSource = this.dataSource$.asObservable().pipe(switchMap((criteria) => {
		return this.requestSearchStemLengthTests(criteria);
	}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	private formFilterResult!: FilterCriteriaChangeEventResult;
	private modalRef!: NgbModalRef;

	public editRoute = `${StemLengthNavigationPath.parent}/${StemLengthNavigationPath.children.edit}`;
	public currentRoute = `${StemLengthNavigationPath.parent}/${StemLengthNavigationPath.children.list}`;
	public formFilter!: FormGroup;

	constructor(
		private ncpConfirmationService: NcpConfirmationService,
		private stemLengthTestApiService: StemLengthTestApiService, private modalService: NgbModal,
		private portletFilterFormBuilderService: PortletFilterFormBuilderService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm();
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
		let searchCriteria = new RequestStemLengthTestSearchCriteria();

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

	public requestSearchStemLengthTests(criteria: RequestStemLengthTestSearchCriteria) {

		this.loading(true);
		const request = new PostSearchStemLengthTestsRequest(criteria);
		return this.stemLengthTestApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(testId: string) {
		const modalRef = this.modalService.open(EditStemLengthTestComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditStemLengthTestComponent;
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
			this.stemLengthTestApiService.delete(testId).pipe(finalize(() => {
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
		const isSuccess = this.ncpConfirmationService.confirmation(LabTestsType.StemLengthTest, testId, el);
		isSuccess.subscribe(success => {
			if (success) {
				this.search();
			}
		});
	}
}
