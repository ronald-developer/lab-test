import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DegsRoutingModule } from './degs-routing.module';
import { DegsComponent } from './degs.component';
import { CreateDegsTestsComponent } from './create/create-degs-tests.component';
import { EditDegsTestsComponent } from './edit/edit-degs-tests.component';
import { DegsFormComponent } from './form/degs-form.component';
import { DegsListComponent } from './list/degs-list.component';
import { DegsReportDetailsComponent } from './reports/details/degs-report-details.component';
import { DegsReportSummaryComponent } from './reports/summary/degs-report-summary.component';
import { DegsTestResultComponent } from './degs-test-result/degs-test-result.component';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { StemDegsFormComponent } from './form/stem-degs-form.component';
import { EditStemDegsTestsComponent } from './edit/edit-stem-degs-tests.component';
import { DegsTestCalculatorService } from './services/degs-test-calculator.service';
import { StemDegsTestResultComponent } from './stem-degs-test-result/stem-degs-test-result.component';
import { StemDegsTestCalculatorService } from './services/stem-degs-test-calculator.service';


@NgModule({
	declarations: [
		DegsComponent,
		CreateDegsTestsComponent,
		EditDegsTestsComponent,
		DegsFormComponent,
		DegsListComponent,
		DegsReportDetailsComponent,
		DegsReportSummaryComponent,
		DegsTestResultComponent,
		StemDegsFormComponent,
		EditStemDegsTestsComponent,
		StemDegsTestResultComponent
	],
	imports: [
		CommonModule,
		DegsRoutingModule,
		PagesModule
	],
	providers: [PortletFilterFormBuilderService, DegsTestCalculatorService, StemDegsTestCalculatorService]
})
export class DegsModule { }
