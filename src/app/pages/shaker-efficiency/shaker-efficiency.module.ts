import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages.module';

import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';
import { CreateShakerEfficiencyTestsComponent } from './create/create-shaker-efficiency-tests.component';
import { EditShakerEfficiencyTestsComponent } from './edit/edit-shaker-efficiency-tests.component';
import { ShakerEfficiencyFormComponent } from './form/shaker-efficiency-form.component';
import { ShakerEfficiencyListComponent } from './list/shaker-efficiency-list.component';
import { ShakerEfficiencyReportDetailsComponent } from './reports/details/shaker-efficiency-report-details.component';
import { ShakerEfficiencyTestCalculatorService } from './services/shaker-efficiency-test-calculator.service';
import { ShakerEfficiencyTestResultComponent } from './shaker-efficiency-test-result/shaker-efficiency-test-result.component';
import { ShakerEfficiencyComponent } from './shaker-efficiency.component';
import { ShakerEfficiencyReportSummaryComponent } from './reports/summary/shaker-efficiency-report-summary.component';
import { ShakerEfficiencyRoutingModule } from './shaker-efficiency-routing.module';



@NgModule({
  declarations: [
    ShakerEfficiencyComponent,
    CreateShakerEfficiencyTestsComponent,
    EditShakerEfficiencyTestsComponent,
    ShakerEfficiencyFormComponent,
    ShakerEfficiencyListComponent,
    ShakerEfficiencyReportDetailsComponent,
    ShakerEfficiencyReportSummaryComponent,
    ShakerEfficiencyTestResultComponent,
  ],
  imports: [
    CommonModule,
    ShakerEfficiencyRoutingModule,
    PagesModule
  ],
  providers: [ShakerEfficiencyTestCalculatorService, PortletFilterFormBuilderService]
})
export class ShakerEfficiencyModule { }
