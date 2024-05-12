import { Component } from '@angular/core';

import { Chart } from 'angular-highcharts';
import { Observable, Subject, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { RequestMoistureMettlerDashboardCriteria } from 'src/app/api-services/dashboard/moisture-mettler-dashboard-api/models/request-moisture-mettler-dashboard-criteria';
import { ResponseMoistureMettlerDashboardResult } from 'src/app/api-services/dashboard/moisture-mettler-dashboard-api/models/response-moisture-mettler-dashboard-result';
import { MoistureMettlerDashboardApiService } from 'src/app/api-services/dashboard/moisture-mettler-dashboard-api/moisture-mettler-dashboard-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Fields } from 'src/app/shared/components/portlet-filter/portlet-filter-criteria/models/fields';
import { FilterCriteriaChangeEventResult } from 'src/app/shared/models/filter-criteria-change-event-result';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { MettlerResultChartOptionBuilder } from './mettler-result-chart-option-builder';

@Component({
	selector: 'app-mettler-chart',
	templateUrl: './mettler-chart.component.html',
	providers: [PortletFilterFormBuilderService]
})
export class MettlerChartComponent extends BaseComponent {
	dataSource$ = new Subject<RequestMoistureMettlerDashboardCriteria>();
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
				return of(MettlerResultChartOptionBuilder.buildChartOptions());
			}
			return this.requestSearchMettlerChartData(criteria).pipe(
				tap(response => this.totalPages = response?.details?.totalCount),
				map(response => this.buildChartModel(response)),
				catchError(() => of(MettlerResultChartOptionBuilder.buildChartOptions())))
		}));

	constructor(
		private moistureMettlerDashboardApiService: MoistureMettlerDashboardApiService) {
		super();
	}

	private buildChartModel(response: ResponseMoistureMettlerDashboardResult) {
		const categories = response?.details?.results.map(mettlerResult => `${mettlerResult.cartonNo}`);
		const series = response?.details?.results.map(mettlerResult => mettlerResult.mettlerResult);

		const chart = MettlerResultChartOptionBuilder.buildChartOptions(categories, series, response.ucl, response.lcl, response.target, series.length - 1);

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


	public requestSearchMettlerChartData(criteria: RequestMoistureMettlerDashboardCriteria): Observable<ResponseMoistureMettlerDashboardResult> {
		this.loading(true);
		return this.moistureMettlerDashboardApiService.getMettlerDashboardData(criteria).pipe(
			map(data => data.response.data),
			this.endLoading());
	}

	private initSearchCriteria(filterCriteria: FilterCriteriaChangeEventResult, page: number = 1) {
		let searchCriteria = new RequestMoistureMettlerDashboardCriteria();
		searchCriteria = {
			...filterCriteria,
			operationOrderId: +filterCriteria.operationOrderId,
			productTypeId: +filterCriteria.productTypeId,
			page: this.pageNumber
		}
		return searchCriteria;
	}

}
