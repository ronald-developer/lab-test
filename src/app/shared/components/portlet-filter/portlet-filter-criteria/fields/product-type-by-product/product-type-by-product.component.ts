import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fields } from '../../models/fields';

/** Product type disabled filter - shows product type depending on the selected packing grade */
@Component({
	selector: 'app-product-type-by-product',
	templateUrl: './product-type-by-product.component.html'
})
export class ProductTypeByProductComponent implements OnChanges {
	public controlName = Fields.ProductTypeByProduct;
	@Input() formFilters!: FormGroup;
	@HostBinding('attr.id') id = Fields.ProductTypeByProduct;
	@HostBinding('class.d-none') hide!: boolean;

	constructor() { }

	ngOnChanges(): void {
		let field = this.formFilters.get(Fields.ProductTypeByProduct);
		this.hide = field ? !!(this.formFilters.get(Fields.ProductTypeByProduct)?.disabled) : true;
	}

	public get operationOrder() {
		return this.formFilters?.get(Fields.OperationNo)?.value;
	}

	public get packingGradeByProduct() {
		return this.formFilters?.get(Fields.PackingGradeByProduct)?.value;
	}

	public productTypeChanged(val: number) {
		this.formFilters.get(Fields.ProductTypeByProduct)?.setValue(val);
	}
}
