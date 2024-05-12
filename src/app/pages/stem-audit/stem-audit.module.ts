import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';
import { CreateStemAuditTestsComponent } from './create/create-stem-audit-tests.component';
import { EditStemAuditTestsComponent } from './edit/edit-stem-audit-tests.component';
import { StemAuditFormComponent } from './form/stem-audit-form.component';
import { StemAuditListComponent } from './list/stem-audit-list.component';
import { StemAuditReportDetailsComponent } from './reports/details/stem-audit-report-details.component';
import { StemAuditReportSummaryComponent } from './reports/summary/stem-audit-report-summary.component';
import { StemAuditTestCalculatorService } from './services/stem-audit-test-calculator.service';
import { StemAuditComponent } from './stem-audit.component';
import { StemAuditRoutingModule } from './stem-audit-routing.module';
import { StemAuditTestResultComponent } from './stem-audit-test-result/stem-audit-test-result.component';


@NgModule({
  declarations: [
    StemAuditComponent,
    CreateStemAuditTestsComponent,
    EditStemAuditTestsComponent,
    StemAuditFormComponent,
    StemAuditListComponent,
    StemAuditReportDetailsComponent,
    StemAuditReportSummaryComponent,
    StemAuditTestResultComponent
  ],
  imports: [
    CommonModule,
    StemAuditRoutingModule,
    PagesModule
  ],
  providers: [StemAuditTestCalculatorService, PortletFilterFormBuilderService]
})
export class StemAuditModule { }
