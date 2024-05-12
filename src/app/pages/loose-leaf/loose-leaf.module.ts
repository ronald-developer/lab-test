import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LooseLeafRoutingModule } from './loose-leaf-routing.module';
import { LooseLeafComponent } from './loose-leaf.component';
import { CreateLooseLeafTestsComponent } from './create/create-loose-leaf-tests.component';
import { EditLooseLeafTestsComponent } from './edit/edit-loose-leaf-tests.component';
import { LooseLeafFormComponent } from './form/loose-leaf-form.component';
import { LooseLeafListComponent } from './list/loose-leaf-list.component';
import { LooseLeafReportDetailsComponent } from './reports/details/loose-leaf-report-details.component';
import { LooseLeafReportSummaryComponent } from './reports/summary/loose-leaf-report-summary.component';
import { PagesModule } from '../pages.module';
import { LooseLeafTestResultComponent } from './loose-leaf-test-result/loose-leaf-test-result.component';
import { LooseLeafTestCalculatorService } from './services/loose-leaf-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    LooseLeafComponent,
    CreateLooseLeafTestsComponent,
    EditLooseLeafTestsComponent,
    LooseLeafFormComponent,
    LooseLeafListComponent,
    LooseLeafReportDetailsComponent,
    LooseLeafReportSummaryComponent,
    LooseLeafTestResultComponent
  ],
  imports: [
    CommonModule,
    LooseLeafRoutingModule,
    PagesModule
  ],
  providers: [LooseLeafTestCalculatorService, PortletFilterFormBuilderService]
})
export class LooseLeafModule { }
