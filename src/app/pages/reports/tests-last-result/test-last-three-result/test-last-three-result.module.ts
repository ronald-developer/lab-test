import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesModule } from 'src/app/pages/pages.module';
import { PortletFilterFormBuilderService } from 'src/app/shared/services/forms/portlet-filter-form-builder.service';
import { TestLastThreeResultListComponent } from './list/test-last-three-result-list.component';


@NgModule({
	declarations: [
		TestLastThreeResultListComponent,
	],
	imports: [
		CommonModule,
		PagesModule
	],
	providers: [PortletFilterFormBuilderService]
})
export class TestLastThreeResultModule { }
