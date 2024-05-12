import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditTemplateModule } from 'src/app/shared/components/create-edit-template/create-edit-template.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { PortletFilterModule } from 'src/app/shared/components/portlet-filter/portlet-filter.module';
import { ShakerListComponent } from './list/shaker-list.component';
import { CreateShakerComponent } from './create/create-shaker.component';
import { EditShakerComponent } from './edit/edit-shaker.component';
import { ShakerFormComponent } from './form/shaker-form.component';

@NgModule({
	declarations: [
		ShakerListComponent,
		CreateShakerComponent,
		EditShakerComponent,
		ShakerFormComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CreateEditTemplateModule,
		SharedModule,
		TableModule,
		PortletFilterModule
	]
})
export class ShakerModule { }
