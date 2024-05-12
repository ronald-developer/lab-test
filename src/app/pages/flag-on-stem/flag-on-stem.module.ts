import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagOnStemComponent } from './flag-on-stem.component';
import { FlagOnStemRoutingModule } from './flag-on-stem-routing.module';
import { CreateFlagOnStemTestsComponent } from './create/create-flag-on-stem-tests.component';
import { EditFlagOnStemTestsComponent } from './edit/edit-flag-on-stem-tests.component';
import { FlagOnStemFormComponent } from './form/flag-on-stem-form.component';
import { FlagOnStemListComponent } from './list/flag-on-stem-list.component';
import { FlagOnStemReportDetailsComponent } from './reports/details/flag-on-stem-report-details.component';
import { FlagOnStemReportSummaryComponent } from './reports/summary/flag-on-stem-report-summary.component';
import { PagesModule } from '../pages.module';
import { FlagOnStemTestResultComponent } from './flag-on-stem-test-result/flag-on-stem-test-result.component';
import { FlagOnStemTestCalculatorService } from './services/flag-on-stem-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';



@NgModule({
  declarations: [
    FlagOnStemComponent,
    CreateFlagOnStemTestsComponent,
    EditFlagOnStemTestsComponent,
    FlagOnStemFormComponent,
    FlagOnStemListComponent,
    FlagOnStemReportDetailsComponent,
    FlagOnStemReportSummaryComponent,
    FlagOnStemTestResultComponent
  ],
  imports: [
    CommonModule,
    FlagOnStemRoutingModule,
    PagesModule
  ],
  providers: [FlagOnStemTestCalculatorService, PortletFilterFormBuilderService]
})
export class FlagOnStemModule { }
