import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { SelectOption } from 'src/app/shared/models/select-option';
import { ByProductPackingGradeService } from 'src/app/shared/services/dropdowns/by-product-packing-grade.service';

const BY_PRODUCTS_PACKING_GRADE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ByProductsPackingGradeDropdownComponent),
	multi: true
}
@Component({
	selector: 'app-by-products-packing-grade-dropdown',
	templateUrl: './by-products-packing-grade-dropdown.component.html',
	providers: [BY_PRODUCTS_PACKING_GRADE_CONTROL_ACCESSOR]
})
export class ByProductsPackingGradeDropdownComponent implements ControlValueAccessor {

	public packingGrades: SelectOption[] = [];
	public packingGradeId!: string;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	productType: number | null;
	@Input() set productTypeId(value: number) {
		this.packingGradeSource$.next(value);
	}

	private packingGradeSource$ = new BehaviorSubject<number | null>(null);
	public packingGrades$ = this.packingGradeSource$.asObservable().pipe(
		tap(val => this.productType = val),
		switchMap(val => this.byProductPackingGradeService.byProducts$),
		map(x => x.filter(item => item.productTypeId == this.productType).map(x => new SelectOption(x.packingGradeId, x.packingGradeCode))));

	constructor(private byProductPackingGradeService: ByProductPackingGradeService) { }

	writeValue(obj: any): void {
		this.packingGradeId = obj || 0;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.packingGradeId);
	}

	public onClick() {
		this.onTouch();
	}

}
