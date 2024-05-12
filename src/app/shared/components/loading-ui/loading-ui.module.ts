import { LoadingUiDirective } from '../../directives/loading-ui.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingUiComponent } from './loading-ui.component';



@NgModule({
    declarations: [
        LoadingUiComponent, LoadingUiDirective
    ],
    imports: [
        CommonModule
    ], exports: [LoadingUiComponent, LoadingUiDirective]
})
export class LoadingUiModule { }
