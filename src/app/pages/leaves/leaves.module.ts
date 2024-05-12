import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { LeavesListComponent } from './list/leaves-list.component';
import { CreateLeavesTestsComponent } from './create/create-leaves-tests.component';
import { EditLeavesTestsComponent } from './edit/edit-leaves-tests.component';
import { LeavesFormComponent } from './form/leaves-form.component';
import { LeavesReportDetailsComponent } from './reports/details/leaves-report-details.component';
import { LeavesReportSummaryComponent } from './reports/summary/leaves-report-summary.component';
import { PagesModule } from '../pages.module';
import { LeavesTestResultComponent } from './leaves-test-result/leaves-test-result.component';
import { LeavesTestCalculatorService } from './services/leaves-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    LeavesComponent,
    LeavesListComponent,
    CreateLeavesTestsComponent,
    EditLeavesTestsComponent,
    LeavesFormComponent,
    LeavesReportDetailsComponent,
    LeavesReportSummaryComponent,
    LeavesTestResultComponent
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    PagesModule
  ],
  providers: [LeavesTestCalculatorService, PortletFilterFormBuilderService]
})
export class LeavesModule { }
