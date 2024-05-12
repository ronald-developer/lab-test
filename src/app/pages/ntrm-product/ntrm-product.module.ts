import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UploadResultModule } from 'src/app/shared/components/upload-result/upload-result.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { PagesModule } from '../pages.module';
import { CreateNtrmProductTestsComponent } from './create/create-ntrm-product-test-component';
import { EditNtrmProductTestsComponent } from './edit/edit-ntrm-product-tests.component';
import { NtrmProductTestFormComponent } from './form/ntrm-product-test-form.component';
import { NtrmProductListComponent } from './list/ntrm-product-list.component';
import { NtrmProductRoutingModule } from './ntrm-product-routing.module';
import { NtrmProductTestResultComponent } from './ntrm-product-test-result/ntrm-product-test-result.component';
import { NtrmProductComponent } from './ntrm-product.component';
import { NtrmProductReportDetailsComponent } from './reports/details/ntrm-product-report-details.component';
import { NtrmProductReportSummaryComponent } from './reports/summary/ntrm-product-report-summary.component';
import { NtrmProductTestCalculatorService } from './services/ntrm-product-test-calculator.service';


@NgModule({
	declarations: [
		NtrmProductComponent,
		EditNtrmProductTestsComponent,
		NtrmProductListComponent,
		NtrmProductReportDetailsComponent,
		NtrmProductReportSummaryComponent,
		NtrmProductTestResultComponent,
		CreateNtrmProductTestsComponent,
		NtrmProductTestFormComponent
	],
	imports: [
		CommonModule,
		NtrmProductRoutingModule,
		PagesModule,
		UploadResultModule
	], providers: [NtrmProductTestCalculatorService, PortletFilterFormBuilderService]
})
export class NtrmProductModule { }
