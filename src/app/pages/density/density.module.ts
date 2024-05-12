import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DensityRoutingModule } from './density-routing.module';
import { DensityComponent } from './density.component';
import { CreateDensityTestsComponent } from './create/create-density-tests.component';
import { EditDensityTestsComponent } from './edit/edit-density-tests.component';
import { DensityFormComponent } from './form/density-form.component';
import { DensityListComponent } from './list/density-list.component';
import { DensityReportDetailsComponent } from './reports/details/density-report-details.component';
import { DensityReportSummaryComponent } from './reports/summary/density-report-summary.component';
import { DensityTestResultComponent } from './density-test-result/density-test-result.component';
import { DensityTestCalculatorService } from './services/density-test-calculator.service';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    DensityComponent,
    CreateDensityTestsComponent,
    EditDensityTestsComponent,
    DensityFormComponent,
    DensityListComponent,
    DensityReportDetailsComponent,
    DensityReportSummaryComponent,
    DensityTestResultComponent
  ],
  imports: [
    CommonModule,
    DensityRoutingModule,
    PagesModule
  ],
  providers: [DensityTestCalculatorService, PortletFilterFormBuilderService]
})
export class DensityModule { }
