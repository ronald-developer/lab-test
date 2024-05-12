import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[TableComponent]
})
export class TableModule { }
