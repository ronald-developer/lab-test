import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEditTemplateModule } from 'src/app/shared/components/create-edit-template/create-edit-template.module';
import { CreateNtrmLocationComponent } from './create/create-ntrm-location.component';
import { EditNtrmLocationComponent } from './edit/edit-ntrm-location.component';
import { NtrmLocationFormComponent } from './form/ntrm-location-form.component';
import { NtrmLocationListComponent } from './list/ntrm-location-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { PortletFilterModule } from 'src/app/shared/components/portlet-filter/portlet-filter.module';

@NgModule({
  declarations: [
    NtrmLocationListComponent,
    CreateNtrmLocationComponent,
    EditNtrmLocationComponent,
    NtrmLocationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateEditTemplateModule,
    SharedModule,
    TableModule,
    PortletFilterModule
  ]
})
export class LocationModule { }
