import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable, Subject, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { RequestStemDegsDashboardCriteria } from 'src/app/api-services/dashboard/shared/models/request-stem-degs-dashboard-criteria';
import { ResponseStemDegsTotalStemDashboardResult } from 'src/app/api-services/dashboard/stem-degs-total-stem-dashboard-api/models/response-stem-degs-total-stem-dashboard-result';
import { StemDegsTotalStemDashboardApiService } from 'src/app/api-services/dashboard/stem-degs-total-stem-dashboard-api/stem-degs-total-stem-dashboard-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { StemDegsTotalStemResultChartOptionBuilder as StemDegsTotalStemChartModel } from './stem-degs-total-stem-result-chart-option-builder';

@Component({
	selector: 'app-stem-degs-total-stem-chart',
	templateUrl: './stem-degs-total-stem-chart.component.html',
	providers: [PortletFilterFormBuilderService]
})
export class StemDegsTotalStemChartComponent extends BaseComponent {
	dataSource$ = new Subject<RequestStemDegsDashboardCriteria>();
	hideDefaultFilters = [
		Fields.FilterByOperationNo,
		Fields.FilterByDate,
		Fields.PackingGrade,
		Fields.ShiftType,
		Fields.IsNonCompliant,
		Fields.MotherGrade,
		Fields.FromDate];
	additionalFilters = [Fields.PageSize];
	chart: Chart = new Chart();
	defaultPageSize = 10;
	totalPages: number;
	pageNumber = 1;
	public dataSource: Observable<Chart> = this.dataSource$.asObservable().pipe(
		startWith(null),
		switchMap((criteria) => {
			if (!criteria) {
				return of(StemDegsTotalStemChartModel.buildChartOptions());
			}
			return this.requestSearchTotalStemChartData(criteria).pipe(
				tap(response => this.totalPages = response?.details?.totalCount),
				map(response => this.buildChartModel(response)),
				catchError(() => of(StemDegsTotalStemChartModel.buildChartOptions())))
		}));

	constructor(
		private stemDegsTotalStemDashboardApiService: StemDegsTotalStemDashboardApiService,
		private datePipe: DatePipe) {
		super();
	}

	private buildChartModel(response: ResponseStemDegsTotalStemDashboardResult) {
		const categories = response?.details.results.map(result => `${this.datePipe.transform(result.entryDate, 'dd/MM/yyyy')}`);

		const series = response?.details.results.map(result => result.totalStemResult);

		const chart = StemDegsTotalStemChartModel.buildChartOptions(categories, series, response.ucl, response.lcl, response.target, series.length - 1);

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


	public requestSearchTotalStemChartData(criteria: RequestStemDegsDashboardCriteria): Observable<ResponseStemDegsTotalStemDashboardResult> {
		this.loading(true);
		return this.stemDegsTotalStemDashboardApiService.getStemDegsTotalStemDashboardData(criteria).pipe(
			map(data => data.response.data),
			this.endLoading());
	}

	private initSearchCriteria(filterCriteria: FilterCriteriaChangeEventResult, page: number = 1) {
		let searchCriteria = new RequestStemDegsDashboardCriteria();
		searchCriteria = {
			...filterCriteria,
			operationOrderId: +filterCriteria.operationOrderId,
			page: this.pageNumber
		}
		return searchCriteria;
	}

}
