import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StemInScrapRoutingModule } from './stem-in-scrap-routing.module';
import { StemInScrapComponent } from './stem-in-scrap.component';
import { CreateStemInScrapTestsComponent } from './create/create-stem-in-scrap-tests.component';
import { EditStemInScrapTestsComponent } from './edit/edit-stem-in-scrap-tests.component';
import { StemInScrapFormComponent } from './form/stem-in-scrap-form.component';
import { StemInScrapListComponent } from './list/stem-in-scrap-list.component';
import { StemInScrapReportDetailsComponent } from './reports/details/stem-in-scrap-report-details.component';
import { StemInScrapReportSummaryComponent } from './reports/summary/stem-in-scrap-report-summary.component';
import { PagesModule } from '../pages.module';
import { StemInScrapTestResultComponent } from './stem-in-scrap-test-result/stem-in-scrap-test-result.component';
import { StemInScrapTestCalculatorService } from './services/stem-in-scrap-test-calculator.service';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    StemInScrapComponent,
    CreateStemInScrapTestsComponent,
    EditStemInScrapTestsComponent,
    StemInScrapFormComponent,
    StemInScrapListComponent,
    StemInScrapReportDetailsComponent,
    StemInScrapReportSummaryComponent,
    StemInScrapTestResultComponent
  ],
  imports: [
    CommonModule,
    StemInScrapRoutingModule,
    PagesModule
  ],
  providers: [StemInScrapTestCalculatorService, PortletFilterFormBuilderService]
})
export class StemInScrapModule { }
