import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { PagedResult } from 'src/app/api-services/common-models/paged-result';
import { RequestShakerSearchCriteria } from 'src/app/api-services/setup/shaker-api/models/request-shaker-search-criteria';
import { ResponseShakerSearchResult } from 'src/app/api-services/setup/shaker-api/models/response-shaker-search-result';
import { PostSearchShakerRequest } from 'src/app/api-services/setup/shaker-api/requests/post-search-shaker-request';
import { ShakerApiService } from 'src/app/api-services/setup/shaker-api/shaker-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ShakerNavigationPath } from '../navigation/shaker-navigation-path';
import { EditShakerComponent } from '../edit/edit-shaker.component';

@Component({
	selector: 'app-shaker-list',
	templateUrl: './shaker-list.component.html'
})
export class ShakerListComponent extends BaseComponent implements AfterViewInit, OnInit {
	public editRoute = `${ShakerNavigationPath.parent}/${ShakerNavigationPath.children.edit}`;
	dataSource$ = new Subject<RequestShakerSearchCriteria>();
	public dataSource: Observable<PagedResult<ResponseShakerSearchResult>> = this.dataSource$.asObservable().pipe(
		switchMap((criteria) => {
			return this.requestSearchShakers(criteria);
		}));

	public totalCount = 0;
	public currentPage!: number;
	public defaultPageSize = 10;
	formFilter = new FormGroup({ name: new FormControl(''), includeInactive: new FormControl(false) });
	formFilterResult: any;
	constructor(private shakerApiService: ShakerApiService, private modalService: NgbModal) {
		super();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.search();
	}

	private getSearchCriteria(page: number = 1) {
		let searchCriteria: RequestShakerSearchCriteria = {
			page: page,
			pageSize: this.defaultPageSize,
			includeInactive: this.formFilter?.value.includeInactive as boolean,
			name: this.formFilter?.value.name as string
		}
		return searchCriteria;
	}

	public requestSearchShakers(criteria: RequestShakerSearchCriteria) {
		this.loading(true);
		const request = new PostSearchShakerRequest(criteria);
		return this.shakerApiService.search(request).pipe(
			tap(data => this.totalCount = data.response.data.totalCount),
			map(data => data.response.data),
			this.endLoading());
	}

	public search(page: number = 1, initialize = false) {
		const searchCriteria = this.getSearchCriteria(page);
		this.dataSource$.next(searchCriteria);
	}

	public edit(id: string) {
		const modalRef = this.modalService.open(EditShakerComponent, { size: 'lg', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as EditShakerComponent;
		instance.id = id;
		modalRef.closed.subscribe(didSaveChanges => {
			if (didSaveChanges) {
				this.search();
			}
		});
	}

}
