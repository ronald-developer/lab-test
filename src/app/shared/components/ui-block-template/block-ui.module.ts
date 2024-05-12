import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockUiComponent } from './block-ui.component';
@NgModule({
    declarations: [
        BlockUiComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [BlockUiComponent],
    providers: []
})
export class BlockUiModule { }
