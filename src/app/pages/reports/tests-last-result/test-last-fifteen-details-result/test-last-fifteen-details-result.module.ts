import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagesModule } from 'src/app/pages/pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { DegsDryLastFifteenDetailsListComponent } from './degs-dry/degs-dry-last-fifteen-details-list.component';


@NgModule({
	declarations: [
		DegsDryLastFifteenDetailsListComponent
	],
	imports: [
		CommonModule,
		PagesModule
	],
	providers: [PortletFilterFormBuilderService]
})
export class TestLastFifteenDetailsResultModule { }
