import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResponseOperationOrderByProduct } from 'src/app/api-services/backend/operation-order-api/models/response-operation-order-by-product-model';
import { SelectOption } from 'src/app/shared/models/select-option';
import { ByProductPackingGradeService } from 'src/app/shared/services/dropdowns/by-product-packing-grade.service';


const PRODUCT_TYPES_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ProductTypesDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-product-types-dropdown',
	templateUrl: './product-types-dropdown.component.html',
	providers: [PRODUCT_TYPES_CONTROL_ACCESSOR]
})
export class ProductTypesDropdownComponent implements ControlValueAccessor, OnInit {

	public byProducts: SelectOption[] = [];
	public productTypeId!: number;
	private operationOrder!: number;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() disabled!: boolean;
	@Input() invalid!: boolean;
	@Input() set operationOrderId(value: number) {
		this.operationOrder = value;
		this.byProductPackingGradeService.getByProducts(value).then(data => {
			this.byProducts = this.getProductTypeOptions(data);
		});
	}

	@Input() set packingGradeId(value: number) {
		this.byProductPackingGradeService.getByProducts(this.operationOrder).then(data => {
			const result = data.find(x => x.packingGradeId === value);
			if (result) {
				this.writeValue(result.productTypeId);
				this.productTypeChanged.emit(this.productTypeId);
			}
		});
	}

	@Output() productTypeChanged = new EventEmitter<number>();

	constructor(private byProductPackingGradeService: ByProductPackingGradeService) {
	}

	ngOnInit(): void {
	}

	private getProductTypeOptions(value: ResponseOperationOrderByProduct[]) {
		return value.map(data => new SelectOption(data.productTypeId, data.productTypeCode));
	}

	writeValue(obj: any): void {
		this.productTypeId = obj || 0;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.productTypeId);
		this.productTypeChanged.emit(this.productTypeId);
	}

	public onClick() {
		this.onTouch();
	}

}
