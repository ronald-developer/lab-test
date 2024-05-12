import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationModule } from './location/location.module';
import { SetupRoutingModule } from './setup-routing.module';
import { ShakerModule } from './shaker/shaker.module';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		SharedModule,
		LocationModule,
		ShakerModule,
		SetupRoutingModule
	], exports: [
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		SharedModule
	]
})
export class SetupModule { }
