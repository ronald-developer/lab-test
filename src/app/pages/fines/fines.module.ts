import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinesRoutingModule } from './fines-routing.module';
import { FinesComponent } from './fines.component';
import { CreateFinesTestsComponent } from './create/create-fines-tests.component';
import { EditFinesTestsComponent } from './edit/edit-fines-tests.component';
import { FinesFormComponent } from './form/fines-form.component';
import { FinesListComponent } from './list/fines-list.component';
import { FinesReportDetailsComponent } from './reports/details/fines-report-details.component';
import { FinesReportSummaryComponent } from './reports/summary/fines-report-summary.component';
import { FinesTestResultComponent } from './fines-test-result/fines-test-result.component';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { FinesTestCalculatorService } from './services/fines-test-calculator.service';


@NgModule({
	declarations: [
		FinesComponent,
		CreateFinesTestsComponent,
		EditFinesTestsComponent,
		FinesFormComponent,
		FinesListComponent,
		FinesReportDetailsComponent,
		FinesReportSummaryComponent,
		FinesTestResultComponent
	],
	imports: [
		CommonModule,
		FinesRoutingModule,
		PagesModule
	], providers: [FinesTestCalculatorService, PortletFilterFormBuilderService]
})
export class FinesModule { }
