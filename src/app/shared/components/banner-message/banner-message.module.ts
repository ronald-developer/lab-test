import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerMessageComponent } from './banner-message.component';
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [
    BannerMessageComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
  ],
  exports:[BannerMessageComponent]
})
export class BannerMessageModule { }
