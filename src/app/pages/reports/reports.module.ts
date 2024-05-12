import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';
import { TestLastThreeResultModule } from './tests-last-result/test-last-three-result/test-last-three-result.module';
import { TestLastFifteenDetailsResultModule } from './tests-last-result/test-last-fifteen-details-result/test-last-fifteen-details-result.module';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		TestLastThreeResultModule,
		TestLastFifteenDetailsResultModule,
		ReportsRoutingModule
	]
})
export class ReportsModule { }
