import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

@Component({
	selector: 'app-packing-grade-by-product',
	templateUrl: './packing-grade-by-product.component.html'
})
export class PackingGradeByProductComponent implements OnChanges {
	public controlName = Fields.PackingGradeByProduct;
	@Input() formFilters!: FormGroup;
	@HostBinding('attr.id') id = Fields.PackingGradeByProduct;
	@HostBinding('class.d-none') hide!: boolean;
	constructor() { }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.PackingGradeByProduct);
		this.hide = field ? !!(this.formFilters.get(Fields.PackingGradeByProduct)?.disabled) : true;
	}

	public get operationOder() {
		return this.formFilters.get(Fields.OperationNo)?.value;
	}

}
