import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BundleBusterRoutingModule } from './bundle-buster-routing.module';
import { EditBundleBusterTestsComponent } from './edit/edit-bundle-buster-tests.component';
import { CreateBundleBusterTestsComponent } from './create/create-bundle-buster-tests.component';
import { PagesModule } from '../pages.module';
import { BundleBusterListComponent } from './list/bundle-buster-list.component';
import { BundleBusterReportDetailsComponent } from './reports/details/bundle-buster-report-details.component';
import { BundleBusterReportSummaryComponent } from './reports/summary/bundle-buster-report-summary.component';
import { BundleBusterFormComponent } from './form/bundle-buster-form.component';
import { BundleBusterTestCalculatorService } from './services/bundle-buster-test-calculator.service';
import { BundleBusterTestResultComponent } from './bundle-buster-test-result/bundle-buster-test-result.component';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';
import { BundleBusterComponent } from './bundle-buster.component';



@NgModule({
  declarations: [
    BundleBusterComponent,
    CreateBundleBusterTestsComponent,
    EditBundleBusterTestsComponent,
    BundleBusterFormComponent,
    BundleBusterListComponent,
    BundleBusterReportDetailsComponent,
    BundleBusterReportSummaryComponent,
    BundleBusterTestResultComponent,
  ],
  imports: [
    CommonModule,
    BundleBusterRoutingModule,
    PagesModule
  ],
  providers: [BundleBusterTestCalculatorService, PortletFilterFormBuilderService]
})
export class BundleBusterModule { }
