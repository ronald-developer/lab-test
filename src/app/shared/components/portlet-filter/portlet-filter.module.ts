import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormFieldsModule } from '../form-fields/form-fields.module';
import { SharedModule } from './../../shared.module';
import { DateOptionComponent } from './portlet-filter-criteria/fields/date-option/date-option.component';
import { DateComponent } from './portlet-filter-criteria/fields/date/date.component';
import { MotherGradeComponent } from './portlet-filter-criteria/fields/mother-grade/mother-grade.component';
import { OperationNoOptionComponent } from './portlet-filter-criteria/fields/operation-no-option/operation-no-option.component';
import { OperationNoComponent } from './portlet-filter-criteria/fields/operation-no/operation-no.component';
import { PackingGradeComponent } from './portlet-filter-criteria/fields/packing-grade/packing-grade.component';
import { ShiftTypeComponent } from './portlet-filter-criteria/fields/shift-type/shift-type.component';
import { TimeComponent } from './portlet-filter-criteria/fields/time/time.component';
import { PortletFilterCriteriaComponent } from './portlet-filter-criteria/portlet-filter-criteria.component';
import { PortletFilterPopupComponent } from './portlet-filter-popup/portlet-filter-popup.component';
import { PortletFilterComponent } from './portlet-filter.component';
import { ChargerTypeComponent } from './portlet-filter-criteria/fields/charger-type/charger-type.component';
import { CartonNoComponent } from './portlet-filter-criteria/fields/carton-no/carton-no.component';
import { ScreenTypeComponent } from './portlet-filter-criteria/fields/screen-type/screen-type.component';
import { TestTypeComponent } from './portlet-filter-criteria/fields/test-type/test-type.component';
import { IsNonCompliantComponent } from './portlet-filter-criteria/fields/is-non-compliant/is-non-compliant.component';
import { ProductTypeComponent } from './portlet-filter-criteria/fields/product-type/product-type.component';
import { PageSizeComponent } from './portlet-filter-criteria/fields/page-size/page-size.component';
import { PackingGradeByProductComponent } from './portlet-filter-criteria/fields/packing-grade-by-product/packing-grade-by-product.component';
import { ProductTypeByProductComponent } from './portlet-filter-criteria/fields/product-type-by-product/product-type-by-product.component';
import { PositionTypeComponent } from './portlet-filter-criteria/fields/position-type/position-type.component';
import { ContainerNoComponent } from './portlet-filter-criteria/fields/container-no/container-no.component';
import { SampleTypeComponent } from './portlet-filter-criteria/fields/sample-type/sample-type.component';

@NgModule({
	declarations: [
		PortletFilterComponent,
		PortletFilterPopupComponent,
		PortletFilterCriteriaComponent,
		OperationNoComponent,
		MotherGradeComponent,
		PackingGradeComponent,
		ShiftTypeComponent,
		DateComponent,
		TimeComponent,
		DateOptionComponent,
		OperationNoOptionComponent,
		ChargerTypeComponent,
		CartonNoComponent,
		ScreenTypeComponent,
		TestTypeComponent,
		IsNonCompliantComponent,
		ProductTypeComponent,
		PageSizeComponent,
		PackingGradeByProductComponent,
		ProductTypeByProductComponent,
		PositionTypeComponent,
		ContainerNoComponent,
		SampleTypeComponent
	],
	imports: [
		CommonModule,
		InlineSVGModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		FormFieldsModule
	],
	exports: [PortletFilterComponent]
})
export class PortletFilterModule { }
