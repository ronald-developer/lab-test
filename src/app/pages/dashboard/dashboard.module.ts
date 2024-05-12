import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesModule } from '../pages.module';
import { DashboardComponent } from './dashboard.component';
import { ChartPortletModule } from 'src/app/shared/components/chart-portlet/chart-portlet.module';
import { MettlerChartComponent } from './moisture-test-charts/mettler-chart/mettler-chart.component';
import { DegsDryTotalOverHalfChartComponent } from './degs-test-charts/degs-dry-total-over-half-chart/degs-dry-total-over-half-chart.component';
import { DegsDryTotalOverQuarterChartComponent } from './degs-test-charts/degs-dry-total-over-quarter-chart/degs-dry-total-over-quarter-chart.component';
import { TemperatureChartComponent } from './moisture-test-charts/temperature-chart/temperature-chart.component';
import { StemDegsTotalStemChartComponent } from './stem-degs-charts/stem-degs-total-stem-chart/stem-degs-total-stem-chart.component';
import { StemDegsTotalObjChartComponent } from './stem-degs-charts/stem-degs-total-obj-chart/stem-degs-total-obj-chart.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
@NgModule({
	declarations: [
		DashboardComponent,
		MettlerChartComponent,
		TemperatureChartComponent,
		DegsDryTotalOverHalfChartComponent,
		DegsDryTotalOverQuarterChartComponent,
		StemDegsTotalStemChartComponent,
		StemDegsTotalObjChartComponent],
	imports: [
		CommonModule,
		PagesModule,
		ChartPortletModule,
		DashboardRoutingModule
	],
	providers: [DatePipe]
})
export class DashboardModule {
	constructor() {
		console.log('Dashboard module init');
	}
}
