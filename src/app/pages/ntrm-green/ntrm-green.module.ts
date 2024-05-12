import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtrmGreenRoutingModule } from './ntrm-green-routing.module';
import { NtrmGreenComponent } from './ntrm-green.component';
import { CreateNtrmGreenTestsComponent } from './create/create-ntrm-green-tests.component';
import { EditNtrmGreenTestsComponent } from './edit/edit-ntrm-green-tests.component';
import { NtrmGreenFormComponent } from './form/ntrm-green-form.component';
import { NtrmGreenListComponent } from './list/ntrm-green-list.component';
import { NtrmGreenReportDetailsComponent } from './reports/details/ntrm-green-report-details.component';
import { NtrmGreenReportSummaryComponent } from './reports/summary/ntrm-green-report-summary.component';
import { NtrmGreenTestResultComponent } from './ntrm-green-test-result/ntrm-green-test-result.component';
import { PagesModule } from '../pages.module';
import { NtrmGreenTestCalculatorService } from './services/ntrm-green-test-calculator.service';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
	declarations: [
		NtrmGreenComponent,
		CreateNtrmGreenTestsComponent,
		EditNtrmGreenTestsComponent,
		NtrmGreenFormComponent,
		NtrmGreenListComponent,
		NtrmGreenReportDetailsComponent,
		NtrmGreenReportSummaryComponent,
		NtrmGreenTestResultComponent
	],
	imports: [
		CommonModule,
		NtrmGreenRoutingModule,
		PagesModule
	],
	providers: [NtrmGreenTestCalculatorService, PortletFilterFormBuilderService]
})
export class NtrmGreenModule { }
