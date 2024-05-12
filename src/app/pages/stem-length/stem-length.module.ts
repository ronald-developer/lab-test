import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesModule } from '../pages.module';
import { CreateStemLengthTestsComponent } from './create/create-stem-length-tests.component';
import { EditStemLengthTestComponent } from './edit/edit-stem-length-test.component';
import { StemLengthFormComponent } from './form/stem-length-form.component';
import { StemLengthListComponent } from './list/stem-length-list.component';
import { StemLengthReportDetailsComponent } from './reports/details/stem-length-report-details.component';
import { StemLengthReportSummaryComponent } from './reports/summary/stem-length-report-summary.component';
import { StemLengthRoutingModule } from './stem-length-routing.module';
import { StemLengthComponent } from './stem-length.component';
import { StemLengthTestResultComponent } from './stem-length-test-result/stem-length-test-result.component';
import { StemLengthTestCalculatorService } from './services/stem-length-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';

@NgModule({
  declarations: [
    StemLengthComponent,
    StemLengthListComponent,
    CreateStemLengthTestsComponent,
    StemLengthFormComponent,
    EditStemLengthTestComponent,
    StemLengthReportDetailsComponent,
    StemLengthReportSummaryComponent,
    StemLengthTestResultComponent,
  ],
  imports: [
    CommonModule,
    StemLengthRoutingModule,
    PagesModule
  ],
  providers: [StemLengthTestCalculatorService, PortletFilterFormBuilderService]
})
export class StemLengthModule { }
