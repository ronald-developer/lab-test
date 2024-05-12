import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
	selector: 'app-date-option',
	templateUrl: './date-option.component.html',
	styleUrls: ['./date-option.component.scss']
})
export class DateOptionComponent implements OnChanges {
	public readonly controlName = Fields.FilterByDate;
	@Input() formFilters!: FormGroup;
	public hide: boolean;
	constructor() { }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.FilterByOperationNo);
		this.hide = field ? !!(this.formFilters.get(Fields.FilterByOperationNo)?.disabled) : true;
	}
}
