import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared.module';
import { ChargerTypeDropdownComponent } from './charger-type-dropdown/charger-type-dropdown.component';
import { DateEntryComponent } from './date-entry/date-entry.component';
import { FreeTextInputComponent } from './free-text-input/free-text-input.component';
import { MotherGradeDropdownComponent } from './mother-grade-dropdown/mother-grade-dropdown.component';
import { OperationOrderDropdownComponent } from './operation-order-dropdown/operation-order-dropdown.component';
import { OperationOrderMothergradeDropdownComponent } from './operation-order-mothergrade-dropdown/operation-order-mothergrade-dropdown.component';
import { PackingGradeByProductsDropdownComponent } from './packing-grade-by-products-dropdown/packing-grade-by-products-dropdown.component';
import { PackingGradeDropdownComponent } from './packing-grade-dropdown/packing-grade-dropdown.component';
import { ShiftTypeDropdownComponent } from './shift-type-dropdown/shift-type-dropdown.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { TestTypeDropdownComponent } from './test-type-dropdown/test-type-dropdown.component';
import { TestUomDropdownComponent } from './test-uom-dropdown/test-uom-dropdown.component';
import { TestMaterialTypeDropdownComponent } from './test-material-type-dropdown/test-material-type-dropdown.component';
import { ProductTypesDropdownComponent } from './product-types-dropdown/product-types-dropdown.component';
import { ByProductsPackingGradeDropdownComponent } from './by-products-packing-grade-dropdown/by-products-packing-grade-dropdown.component';
import { NtrmLocationTypesDropdownComponent } from './ntrm-location-types-dropdown/ntrm-location-types-dropdown.component';
import { CompliantFilterDropdownComponent } from './compliant-filter-dropdown/compliant-filter-dropdown.component';
import { PageSizeDropdownComponent } from './page-size-dropdown/page-size-dropdown.component';
import { PositionTypeDropdownComponent } from './position-type-dropdown/position-type-dropdown.component';
import { SampleTypeDropdownComponent } from './sample-type-dropdown/sample-type-dropdown.component';
import { ShakerDropdownComponent } from './shaker-dropdown/shaker-dropdown.component';


@NgModule({
	declarations: [
		TimeEntryComponent,
		OperationOrderDropdownComponent,
		PackingGradeDropdownComponent,
		ShiftTypeDropdownComponent,
		MotherGradeDropdownComponent,
		DateEntryComponent,
		OperationOrderMothergradeDropdownComponent,
		PackingGradeByProductsDropdownComponent,
		ChargerTypeDropdownComponent,
		FreeTextInputComponent,
		TestTypeDropdownComponent,
		ProductTypesDropdownComponent,
		ByProductsPackingGradeDropdownComponent,
		TestUomDropdownComponent,
		TestMaterialTypeDropdownComponent,
		NtrmLocationTypesDropdownComponent,
		CompliantFilterDropdownComponent,
		PageSizeDropdownComponent,
		PositionTypeDropdownComponent,
		SampleTypeDropdownComponent,
		ShakerDropdownComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
	], exports: [
		TimeEntryComponent,
		OperationOrderDropdownComponent,
		PackingGradeDropdownComponent,
		ShiftTypeDropdownComponent,
		MotherGradeDropdownComponent,
		OperationOrderMothergradeDropdownComponent,
		PackingGradeByProductsDropdownComponent,
		DateEntryComponent,
		ChargerTypeDropdownComponent,
		FreeTextInputComponent,
		TestTypeDropdownComponent,
		ProductTypesDropdownComponent,
		ByProductsPackingGradeDropdownComponent,
		TestUomDropdownComponent,
		TestMaterialTypeDropdownComponent,
		NtrmLocationTypesDropdownComponent,
		CompliantFilterDropdownComponent,
		PageSizeDropdownComponent,
		PositionTypeDropdownComponent,
		SampleTypeDropdownComponent,
		ShakerDropdownComponent
	]
})
export class FormFieldsModule { }
