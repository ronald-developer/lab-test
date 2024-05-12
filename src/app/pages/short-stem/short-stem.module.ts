import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesModule } from './../pages.module';
import { CreateShortStemTestsComponent } from './create/create-short-stem-tests.component';
import { EditShortStemTestsComponent } from './edit/edit-short-stem-tests.component';
import { ShortStemFormComponent } from './form/short-stem-form.component';
import { ShortStemListComponent } from './list/short-stem-list.component';
import { ShortStemReportDetailsComponent } from './reports/details/short-stem-report-details.component';
import { ShortStemReportSummaryComponent } from './reports/summary/short-stem-report-summary.component';
import { ShortStemRoutingModule } from './short-stem-routing.module';
import { ShortStemComponent } from './short-stem.component';
import { ShortStemTestResultComponent } from './short-stem-test-result/short-stem-test-result.component';
import { ShortStemTestCalculatorService } from './services/short-stem-test-calculator.service';
import { PortletFilterFormBuilderService } from '../../shared/services/forms/portlet-filter-form-builder.service';

@NgModule({
    declarations: [
        ShortStemComponent,
        ShortStemListComponent,
        CreateShortStemTestsComponent,
        EditShortStemTestsComponent,
        ShortStemFormComponent,
        ShortStemReportSummaryComponent,
        ShortStemReportDetailsComponent,
        ShortStemTestResultComponent,
    ],
    imports: [
        CommonModule,
        ShortStemRoutingModule,
        PagesModule
    ],
    providers: [ShortStemTestCalculatorService, PortletFilterFormBuilderService]
})
export class ShortStemModule { }
