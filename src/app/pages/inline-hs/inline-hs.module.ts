import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';

import { PagesModule } from '../pages.module';
import { CreateInlineHsTestsComponent } from './create/create-inline-hs-tests.component';
import { EditInlineHsTestsComponent } from './edit/edit-inline-hs-tests.component';
import { InlineHsFormComponent } from './form/inline-hs-form.component';
import { InlineHsRoutingModule } from './inline-hs-routing.module';
import { InlineHsComponent } from './inline-hs.component';
import { InlineHsListComponent } from './list/inline-hs-list.component';
import { InlineHsReportDetailsComponent } from './reports/details/inline-hs-report-details.component';
import { InlineHsReportSummaryComponent } from './reports/summary/inline-hs-report-summary.component';


@NgModule({
  declarations: [
    InlineHsComponent,
    CreateInlineHsTestsComponent,
    EditInlineHsTestsComponent,
    InlineHsFormComponent,
    InlineHsListComponent,
    InlineHsReportDetailsComponent,
    InlineHsReportSummaryComponent
  ],
  imports: [
    CommonModule,
    InlineHsRoutingModule,
    PagesModule
  ],
  providers: [PortletFilterFormBuilderService]
})
export class InlineHsModule { }
