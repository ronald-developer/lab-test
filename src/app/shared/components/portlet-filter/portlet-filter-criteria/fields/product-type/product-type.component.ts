import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
	selector: 'app-product-type',
	templateUrl: './product-type.component.html'
})
export class ProductTypeComponent implements OnChanges {
	public controlName = Fields.ProductType;
	@Input() formFilters!: FormGroup;
	@HostBinding('attr.id') id = Fields.ProductType;
	@HostBinding('class.d-none') hide!: boolean;

	constructor() { }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.ProductType);
		this.hide = field ? !!(this.formFilters.get(Fields.ProductType)?.disabled) : true;
	}

	public get operationOrder() {
		return this.formFilters?.get(Fields.OperationNo)?.value;
	}

}
