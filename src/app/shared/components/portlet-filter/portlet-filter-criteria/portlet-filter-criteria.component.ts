import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldOrientation } from './models/form-field-orietation';

@Component({
	selector: 'app-portlet-filter-criteria',
	templateUrl: './portlet-filter-criteria.component.html'
})
export class PortletFilterCriteriaComponent implements OnInit {
	@Input() formFilters!: FormGroup;
	@Input() formFieldOrientation: FormFieldOrientation;
	constructor() { }

	ngOnInit(): void {
	}
}
