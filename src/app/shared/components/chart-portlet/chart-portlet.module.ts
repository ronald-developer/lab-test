import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPortletComponent } from './chart-portlet.component';
import { ChartModule } from 'angular-highcharts';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { PortletFilterModule } from '../portlet-filter/portlet-filter.module';
import { PortletFilterFormBuilderService } from '../../services/forms/portlet-filter-form-builder.service';
import { ExploadPortletModule } from '../explode-portlet/explode-portlet.module';
import { LoadingUiModule } from '../loading-ui/loading-ui.module';


@NgModule({
	declarations: [
		ChartPortletComponent
	],
	imports: [
		CommonModule,
		InlineSVGModule,
		ChartModule,
		PortletFilterModule,
		ExploadPortletModule,
		LoadingUiModule
	], exports: [ChartPortletComponent],
	providers: [PortletFilterFormBuilderService]
})
export class ChartPortletModule { }
