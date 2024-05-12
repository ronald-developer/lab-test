import { Component, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';
import { SelectOption } from 'src/app/shared/models/select-option';

@Component({
	selector: 'app-page-size',
	templateUrl: './page-size.component.html'
})
export class PageSizeComponent implements OnChanges {
	public controlName = Fields.PageSize;
	@Input() formFilters!: FormGroup;
	@Input() fieldTitle: string = 'Display last';
	@Input() defaultPageSize: number;
	@Input() options: SelectOption[] = [
		new SelectOption(10, '10'),
		new SelectOption(15, '15'),
		new SelectOption(25, '25'),
		new SelectOption(50, '50')
	];
	@HostBinding('attr.id') id = Fields.PageSize;
	@HostBinding('class.d-none') hide!: boolean;

	constructor() { }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.PageSize);
		this.hide = field ? !!(this.formFilters.get(Fields.PageSize)?.disabled) : true;
	}
}
