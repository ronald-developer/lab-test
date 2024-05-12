import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandRoutingModule } from './sand-routing.module';
import { SandComponent } from './sand.component';
import { CreateSandTestsComponent } from './create/create-sand-tests.component';
import { EditSandTestsComponent } from './edit/edit-sand-tests.component';
import { SandFormComponent } from './form/sand-form.component';
import { SandListComponent } from './list/sand-list.component';
import { SandReportDetailsComponent } from './reports/details/sand-report-details.component';
import { SandReportSummaryComponent } from './reports/summary/sand-report-summary.component';
import { SandTestResultComponent } from './sand-test-result/sand-test-result.component';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { SandTestCalculatorService } from './services/sand-test-calculator.service';


@NgModule({
	declarations: [
		SandComponent,
		CreateSandTestsComponent,
		EditSandTestsComponent,
		SandFormComponent,
		SandListComponent,
		SandReportDetailsComponent,
		SandReportSummaryComponent,
		SandTestResultComponent
	],
	imports: [
		CommonModule,
		SandRoutingModule,
		PagesModule
	],
	providers: [SandTestCalculatorService, PortletFilterFormBuilderService]
})
export class SandModule { }
