import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ExplodePortletPopupComponent } from './explode-portlet-popup/explode-portlet-popup.component';
import { ExplodePortletComponent } from './explode-portlet.component';


@NgModule({
	declarations: [
		ExplodePortletComponent,
		ExplodePortletPopupComponent
	],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [ExplodePortletComponent, ExplodePortletPopupComponent]
})
export class ExploadPortletModule { }
