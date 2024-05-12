import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtedLooseLeafRoutingModule } from './butted-loose-leaf-routing.module';
import { ButtedLooseLeafComponent } from './butted-loose-leaf.component';
import { CreateButtedLooseLeafTestsComponent } from './create/create-butted-loose-leaf-tests.component';
import { EditButtedLooseLeafTestsComponent } from './edit/edit-butted-loose-leaf-tests.component';
import { ButtedLooseLeafFormComponent } from './form/butted-loose-leaf-form.component';
import { ButtedLooseLeafListComponent } from './list/butted-loose-leaf-list.component';
import { ButtedLooseLeafReportDetailsComponent } from './reports/details/butted-loose-leaf-report-details.component';
import { ButtedLooseLeafReportSummaryComponent } from './reports/summary/butted-loose-leaf-report-summary.component';
import { PagesModule } from '../pages.module';
import { ButtedLooseLeafTestResultComponent } from './butted-loose-leaf-test-result/butted-loose-leaf-test-result.component';
import { ButtedLooseLeafTestCalculatorService } from './services/butted-loose-leaf-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    ButtedLooseLeafComponent,
    CreateButtedLooseLeafTestsComponent,
    EditButtedLooseLeafTestsComponent,
    ButtedLooseLeafFormComponent,
    ButtedLooseLeafListComponent,
    ButtedLooseLeafReportDetailsComponent,
    ButtedLooseLeafReportSummaryComponent,
    ButtedLooseLeafTestResultComponent
  ],
  imports: [
    CommonModule,
    ButtedLooseLeafRoutingModule,
    PagesModule
  ],
  providers: [ButtedLooseLeafTestCalculatorService, PortletFilterFormBuilderService]
})
export class ButtedLooseLeafModule { }
