import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PagesModule } from '../pages.module';
import { CreateNtrmInLineTestsComponent } from './create/create-ntrm-in-line-test.component';
import { EditNtrmInLineTestsComponent } from './edit/edit-ntrm-in-line-tests.component';
import { NtrmInLineFormComponent } from './form/ntrm-in-line-form.component';
import { NtrmInLineListComponent } from './list/ntrm-in-line-list.component';
import { NtrmInLineRoutingModule } from './ntrm-in-line-routing.module';
import { NtrmInLineTestResultComponent } from './ntrm-in-line-test-result/ntrm-in-line-test-result.component';
import { NtrmInLineComponent } from './ntrm-in-line.component';
import { NtrmInLineReportDetailsComponent } from './reports/details/ntrm-in-line-report-details.component';
import { NtrmInLineReportSummaryComponent } from './reports/summary/ntrm-in-line-report-summary.component';
import { NtrmInLineTestCalculatorService } from './services/ntrm-in-line-test-calculator.service';


@NgModule({
	declarations: [
		NtrmInLineComponent,
		EditNtrmInLineTestsComponent,
		NtrmInLineFormComponent,
		NtrmInLineListComponent,
		NtrmInLineReportDetailsComponent,
		NtrmInLineReportSummaryComponent,
		NtrmInLineTestResultComponent,
		CreateNtrmInLineTestsComponent
	],
	imports: [
		CommonModule,
		NtrmInLineRoutingModule,
		PagesModule
	], providers: [NtrmInLineTestCalculatorService, PortletFilterFormBuilderService]
})
export class NtrmInLineModule { }
