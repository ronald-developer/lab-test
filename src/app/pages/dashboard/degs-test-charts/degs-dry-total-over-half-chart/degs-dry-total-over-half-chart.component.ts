import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SeriesOptionsType, XAxisOptions } from 'highcharts';
import { Observable, Subject, map, of, startWith, switchMap, tap } from 'rxjs';
import { DegsTotalOverHalfDashboardApiService } from 'src/app/api-services/dashboard/degs-total-over-half-dashboard-api/degs-total-over-half-dashboard-api.service';
import { ResponseDegsDryTotalOverHalfDashboardResult } from 'src/app/api-services/dashboard/degs-total-over-half-dashboard-api/models/response-degs-dry-total-over-half-dashboard-result';
import { RequestDegsDryDashboardCriteria } from 'src/app/api-services/dashboard/shared/models/request-degs-dry-dashboard-criteria';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DegsDryTotalOverHalfResultChartOptionBuilder as DegsDryTotalOverHalfChartModel } from './degs-dry-total-over-half-result-chart-option-builder';

@Component({
	selector: 'app-degs-dry-total-over-half-chart',
	templateUrl: './degs-dry-total-over-half-chart.component.html',
	providers: [PortletFilterFormBuilderService]
})
export class DegsDryTotalOverHalfChartComponent extends BaseComponent {
	dataSource$ = new Subject<RequestDegsDryDashboardCriteria>();
	hideDefaultFilters = [Fields.FilterByOperationNo, Fields.FilterByDate, Fields.PackingGrade, Fields.ShiftType, Fields.IsNonCompliant, Fields.MotherGrade, Fields.FromDate];
	additionalFilters = [Fields.PageSize];
	chart: Chart = new Chart();
	defaultPageSize = 10;
	totalPages: number;
	pageNumber = 1;
	public dataSource: Observable<Chart> = this.dataSource$.asObservable().pipe(
		startWith(null),
		switchMap((criteria) => {
			if (!criteria) {
				return of(DegsDryTotalOverHalfChartModel.buildChartOptions());
			}
			return this.requestSearchOverHalfChartData(criteria).pipe(
				tap(response => this.totalPages = response?.details.totalCount),
				map(response => this.buildChartModel(response)))
		}));

	constructor(
		private degsTotalOverHalfDashboardApiService: DegsTotalOverHalfDashboardApiService,
		private datePipe: DatePipe) {
		super();
	}

	private buildChartModel(response: ResponseDegsDryTotalOverHalfDashboardResult) {
		const categories = response?.details.results.map(result => `${this.datePipe.transform(result.entryDate, 'dd/MM/yyyy')}`)

		const series = response?.details.results.map(result => result.totalOverHalfResult)

		const chart = DegsDryTotalOverHalfChartModel.buildChartOptions(categories, series, response.ucl, response.lcl, response.target, series.length - 1);

		return chart;
	}

	setChartFilterCriteria(filterCriteria: FilterCriteriaChangeEventResult) {
		const searchCriteria = this.initSearchCriteria(filterCriteria);
		this.dataSource$.next(searchCriteria);
	}

	public onPageChanged(page: number, filterCriteria: FilterCriteriaChangeEventResult) {
		this.pageNumber = page;
		this.setChartFilterCriteria(filterCriteria);
	}


	public requestSearchOverHalfChartData(criteria: RequestDegsDryDashboardCriteria): Observable<ResponseDegsDryTotalOverHalfDashboardResult> {
		this.loading(true);
		return this.degsTotalOverHalfDashboardApiService.getDegsTotalOverHalfDashboardData(criteria).pipe(
			map(data => data.response.data),
			this.endLoading());
	}

	private initSearchCriteria(filterCriteria: FilterCriteriaChangeEventResult, page: number = 1) {
		let searchCriteria = new RequestDegsDryDashboardCriteria();
		searchCriteria = {
			...filterCriteria,
			operationOrderId: +filterCriteria.operationOrderId,
			page: this.pageNumber
		}
		return searchCriteria;
	}

}
