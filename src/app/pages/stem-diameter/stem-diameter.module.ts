import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StemDiameterRoutingModule } from './stem-diameter-routing.module';
import { StemDiameterComponent } from './stem-diameter.component';
import { CreateStemDiameterTestsComponent } from './create/create-stem-diameter-tests.component';
import { EditStemDiameterTestsComponent } from './edit/edit-stem-diameter-tests.component';
import { StemDiameterFormComponent } from './form/stem-diameter-form.component';
import { StemDiameterListComponent } from './list/stem-diameter-list.component';
import { StemDiameterReportDetailsComponent } from './reports/details/stem-diameter-report-details.component';
import { StemDiameterReportSummaryComponent } from './reports/summary/stem-diameter-report-summary.component';
import { PagesModule } from '../pages.module';
import { StemDiameterTestResultComponent } from './stem-diameter-test-result/stem-diameter-test-result.component';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    StemDiameterComponent,
    CreateStemDiameterTestsComponent,
    EditStemDiameterTestsComponent,
    StemDiameterFormComponent,
    StemDiameterListComponent,
    StemDiameterReportDetailsComponent,
    StemDiameterReportSummaryComponent,
    StemDiameterTestResultComponent
  ],
  imports: [
    CommonModule,
    StemDiameterRoutingModule,
    PagesModule
  ],
  providers: [PortletFilterFormBuilderService]
})
export class StemDiameterModule { }
