import { SharedModule } from './../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuNavComponent } from './sidebar-menu-nav.component';


@NgModule({
    declarations: [SidebarMenuNavComponent],
    imports: [
        CommonModule,
        InlineSVGModule,
        RouterModule,
        SharedModule
    ],
    exports: [SidebarMenuNavComponent]
})
export class SidebarMenuNavModule { }
