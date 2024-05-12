import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldsModule } from '../shared/components/form-fields/form-fields.module';
import { PortletFilterModule } from '../shared/components/portlet-filter/portlet-filter.module';
import { TableModule } from '../shared/components/table/table.module';
import { SharedModule } from '../shared/shared.module';
import { BaseReportTemplateComponent } from '../shared/components/base-report-template/base-report-template.component';
import { CreateEditTemplateComponent } from '../shared/components/create-edit-template/create-edit-template.component';
import { CreateEditTemplateModule } from '../shared/components/create-edit-template/create-edit-template.module';

@NgModule({
	declarations: [
		BaseReportTemplateComponent,
	],
	imports: [
		CommonModule,
		PortletFilterModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		FormFieldsModule,
		SharedModule,
    CreateEditTemplateModule
	], exports: [
		PortletFilterModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		FormFieldsModule,
		SharedModule,
		BaseReportTemplateComponent,
    CreateEditTemplateModule
	]
})
export class PagesModule { }
