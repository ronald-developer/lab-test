import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, switchMap, tap, map } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestNtrmLocationSearchCriteria } from 'src/app/api-services/setup/ntrm-location-api/models/request-ntrm-location-search-criteria';
import { ResponseNtrmLocationSearchResult } from 'src/app/api-services/setup/ntrm-location-api/models/response-ntrm-location-search-result';
import { NtrmLocationApiService } from 'src/app/api-services/setup/ntrm-location-api/ntrm-location-api.service';
import { PostSearchNtrmLocationRequest } from 'src/app/api-services/setup/ntrm-location-api/requests/post-search-ntrm-location-request';
import { LeavesNavigationPath } from 'src/app/pages/leaves/navigation/leaves-navigation-path';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { LocationNavigationPath } from '../navigation/location-navigation-path';
import { EditNtrmLocationComponent } from '../edit/edit-ntrm-location.component';

@Component({
	selector: 'app-ntrm-location-list',
	templateUrl: './ntrm-location-list.component.html'
})
export class NtrmLocationListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${LocationNavigationPath.parent}/${LocationNavigationPath.children.edit}`;
	dataSource$ = new Subject<RequestNtrmLocationSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseNtrmLocationSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchNtrmLocations(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	formFilter = new FormGroup({ name: new FormControl(''), includeInactive: new FormControl(false) });
	formFilterResult: any;
	constructor(private ntrmLocationApiService: NtrmLocationApiService, private modalService: NgbModal) {
		super();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.search();
	}

	private getSearchCriteria(page: number = 1) {
		let searchCriteria: RequestNtrmLocationSearchCriteria = {
			page: page,
			pageSize: this.defaultPageSize,
			includeInactive: this.formFilter?.value.includeInactive as boolean,
			name: this.formFilter?.value.name as string
		}
		return searchCriteria;
	}

	public requestSearchNtrmLocations(criteria: RequestNtrmLocationSearchCriteria) {
		this.loading(true);
		const request = new PostSearchNtrmLocationRequest(criteria);
		return this.ntrmLocationApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(id: string) {
		const modalRef = this.modalService.open(EditNtrmLocationComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditNtrmLocationComponent;
		instance.id = id;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		})
	}

}
