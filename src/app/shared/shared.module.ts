import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BannerMessageModule } from './components/banner-message/banner-message.module';
import { BaseComponent } from './components/base/base.component';
import { LoadingUiModule } from './components/loading-ui/loading-ui.module';
import { MainLayoutSizeListenerDirective } from './directives/main-layout-size-listener.directive';
import { MenuKtListenerDirective } from './directives/menu-kt-listener.directive';
import { NumberDecimalDirective } from './directives/number-decimal.directive';
import { UiGuardDirective } from './directives/ui-guard.directive';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode.scanner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ChartModule } from 'angular-highcharts';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
@NgModule({
	declarations: [
		MenuKtListenerDirective,
		MainLayoutSizeListenerDirective,
		NumberDecimalDirective,
		UiGuardDirective,
		BaseComponent,
		BarcodeScannerComponent,
		ConfirmationDialogComponent,
		WarningDialogComponent
	],
	imports: [
		CommonModule,
		NgSelectModule,
		InlineSVGModule,
		LoadingUiModule,
		BannerMessageModule,
		BsDatepickerModule.forRoot(),
		TimepickerModule.forRoot(),
		PopoverModule.forRoot(),
		PaginationModule.forRoot(),
		NgbModule,
		ChartModule
	],
	exports: [
		MenuKtListenerDirective,
		MainLayoutSizeListenerDirective,
		NumberDecimalDirective,
		UiGuardDirective,
		NgSelectModule,
		BsDatepickerModule,
		TimepickerModule,
		PopoverModule,
		PaginationModule,
		InlineSVGModule,
		LoadingUiModule,
		NgbModule,
		BannerMessageModule,
		BarcodeScannerComponent,
		ConfirmationDialogComponent,
		ChartModule,
		WarningDialogComponent
	]
})
export class SharedModule { }
