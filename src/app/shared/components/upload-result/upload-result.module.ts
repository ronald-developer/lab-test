import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadResultComponent } from './upload-result.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { TableModule } from '../table/table.module';



@NgModule({
	declarations: [
		UploadResultComponent
	],
	exports: [UploadResultComponent],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		TableModule
	]
})
export class UploadResultModule { }
