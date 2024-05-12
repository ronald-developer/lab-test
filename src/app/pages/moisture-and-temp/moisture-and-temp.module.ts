import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UploadResultModule } from 'src/app/shared/components/upload-result/upload-result.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PagesModule } from '../pages.module';
import { EditMoistureAndTempTestsComponent } from './edit/edit-moisture-and-temp-tests.component';
import { MoistureAndTempFormComponent } from './form/moisture-and-temp-form.component';
import { MoistureAndTempListComponent } from './list/moisture-and-temp-list.component';
import { MoistureAndTempRoutingModule } from './moisture-and-temp-routing.module';
import { MoistureAndTempTestResultComponent } from './moisture-and-temp-test-result/moisture-and-temp-test-result.component';
import { MoistureAndTempComponent } from './moisture-and-temp.component';
import { MoistureAndTempReportDetailsComponent } from './reports/details/moisture-and-temp-report-details.component';
import { MoistureAndTempReportSummaryComponent } from './reports/summary/moisture-and-temp-report-summary.component';
import { MoistureAndTempTestUploadComponent } from './upload/moisture-and-temp-test-upload.component';
import { CreateMoistureAndTempTestsComponent } from './create/create-moisture-and-temp-tests.component';


@NgModule({
  declarations: [
    MoistureAndTempComponent,
	CreateMoistureAndTempTestsComponent,
    EditMoistureAndTempTestsComponent,
    MoistureAndTempFormComponent,
    MoistureAndTempListComponent,
    MoistureAndTempReportDetailsComponent,
    MoistureAndTempReportSummaryComponent,
    MoistureAndTempTestResultComponent,
	MoistureAndTempTestUploadComponent
  ],
  imports: [
    CommonModule,
    MoistureAndTempRoutingModule,
	PagesModule,
	UploadResultModule
  ], providers: [ PortletFilterFormBuilderService]
})
export class MoistureAndTempModule { }
