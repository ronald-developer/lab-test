import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipsRoutingModule } from './tips-routing.module';
import { EditTipsTestsComponent } from './edit/edit-tips-tests.component';
import { CreateTipsTestsComponent } from './create/create-tips-tests.component';
import { PagesModule } from '../pages.module';
import { TipsListComponent } from './list/tips-list.component';
import { TipsReportDetailsComponent } from './reports/details/tips-report-details.component';
import { TipsReportSummaryComponent } from './reports/summary/tips-report-summary.component';
import { TipsFormComponent } from './form/tips-form.component';
import { TipsComponent } from './tips.component';
import { TipsTestCalculatorService } from './services/tips-test-calculator.service';
import { TipsTestResultComponent } from './tips-test-result/tips-test-result.component';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';



@NgModule({
  declarations: [
    TipsComponent,
    CreateTipsTestsComponent,
    EditTipsTestsComponent,
    TipsFormComponent,
    TipsListComponent,
    TipsReportDetailsComponent,
    TipsReportSummaryComponent,
    TipsTestResultComponent,
  ],
  imports: [
    CommonModule,
    TipsRoutingModule,
    PagesModule
  ],
  providers: [TipsTestCalculatorService, PortletFilterFormBuilderService]
})
export class TipsModule { }
