import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable, Subject, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { RequestMoistureTemperatureDashboardCriteria } from 'src/app/api-services/dashboard/moisture-temperature-dashboard-api/models/request-moisture-temperature-dashboard-criteria';
import { ResponseMoistureTemperatureDashboardResult } from 'src/app/api-services/dashboard/moisture-temperature-dashboard-api/models/response-moisture-temperature-dashboard-result';
import { MoistureTemperatureDashboardApiService } from 'src/app/api-services/dashboard/moisture-temperature-dashboard-api/moisture-temperature-dashboard-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { TemperatureResultChartOptionBuilder } from './temperature-result-chart-option-builder';

@Component({
	selector: 'app-temperature-chart',
	templateUrl: './temperature-chart.component.html'
})
export class TemperatureChartComponent extends BaseComponent {
	dataSource$ = new Subject<RequestMoistureTemperatureDashboardCriteria>();
	hideDefaultFilters = [
		Fields.FilterByOperationNo,
		Fields.FilterByDate,
		Fields.PackingGrade,
		Fields.ShiftType,
		Fields.IsNonCompliant,
		Fields.MotherGrade,
		Fields.FromDate];
	additionalFilters = [Fields.ProductType, Fields.PageSize];
	chart: Chart = new Chart();
	defaultPageSize = 25;
	totalPages: number;
	pageNumber = 1;
	public dataSource: Observable<Chart> = this.dataSource$.asObservable().pipe(
		startWith(null),
		switchMap((criteria) => {
			if (!criteria) {
				return of(TemperatureResultChartOptionBuilder.buildChartOptions());
			}
			return this.requestSearchTemperatureChartData(criteria).pipe(
				tap(response => this.totalPages = response?.details.totalCount),
				map(response => this.buildChartModel(response)),
				catchError(() => of(TemperatureResultChartOptionBuilder.buildChartOptions())))
		}));


	constructor(
		private moistureTemperatureDashboardApiService: MoistureTemperatureDashboardApiService) {
		super();
	}

	private buildChartModel(response: ResponseMoistureTemperatureDashboardResult) {
		const categories = response?.details.results.map(temperatureResult => `${temperatureResult.cartonNo}`);

		const series = response?.details.results.map(temperatureResult => temperatureResult.temperatureResult);

		const chart = TemperatureResultChartOptionBuilder.buildChartOptions(categories, series, response.ucl, response.lcl, response.target, series.length - 1);

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


	public requestSearchTemperatureChartData(criteria: RequestMoistureTemperatureDashboardCriteria): Observable<ResponseMoistureTemperatureDashboardResult> {
		this.loading(true);
		return this.moistureTemperatureDashboardApiService.getTemperatureDashboardData(criteria).pipe(
			map(data => data.response.data),
			this.endLoading());
	}

	private initSearchCriteria(filterCriteria: FilterCriteriaChangeEventResult, page: number = 1) {
		let searchCriteria = new RequestMoistureTemperatureDashboardCriteria();
		searchCriteria = {
			...filterCriteria,
			operationOrderId: +filterCriteria.operationOrderId,
			productTypeId: +filterCriteria.productTypeId,
			page: this.pageNumber
		}
		return searchCriteria;
	}

}
