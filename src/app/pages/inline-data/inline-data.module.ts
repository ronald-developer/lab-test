import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineDataRoutingModule } from './inline-data-routing.module';
import { InlineDataComponent } from './inline-data.component';
import { CreateInlineDataTestsComponent } from './create/create-inline-data-tests.component';
import { EditInlineDataTestsComponent } from './edit/edit-inline-data-tests.component';
import { InlineDataFormComponent } from './form/inline-data-form.component';
import { InlineDataListComponent } from './list/inline-data-list.component';
import { InlineDataReportDetailsComponent } from './reports/details/inline-data-report-details.component';
import { InlineDataReportSummaryComponent } from './reports/summary/inline-data-report-summary.component';
import { PagesModule } from '../pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';


@NgModule({
  declarations: [
    InlineDataComponent,
    CreateInlineDataTestsComponent,
    EditInlineDataTestsComponent,
    InlineDataFormComponent,
    InlineDataListComponent,
    InlineDataReportDetailsComponent,
    InlineDataReportSummaryComponent
  ],
  imports: [
    CommonModule,
    InlineDataRoutingModule,
    PagesModule
  ],
  providers: [PortletFilterFormBuilderService]
})
export class InlineDataModule { }
