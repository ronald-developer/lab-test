import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../shared/models/select-option';
import { OperationOrderService } from './../../../services/dropdowns/operation-order.service';
const OPERATION_ORDER_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => OperationOrderDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-operation-order-dropdown',
	templateUrl: './operation-order-dropdown.component.html',
	providers: [OPERATION_ORDER_CONTROL_ACCESSOR]
})
export class OperationOrderDropdownComponent implements OnInit, ControlValueAccessor {
	public operationOrders: SelectOption[] = [];
	public operationOrderId!: number;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	@Output() operationOrderChanged = new EventEmitter<void>();
	constructor(
		private operationOrderService: OperationOrderService,
		private detector: ChangeDetectorRef) { }

	async ngOnInit(): Promise<void> {
		this.operationOrders = await this.operationOrderService.getAll();
	}

	writeValue(obj: any): void {
		this.operationOrderId = obj || null;
		this.detector.detectChanges();
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.operationOrderId);
		this.operationOrderChanged.emit();
	}

	public onClick() {
		this.onTouch();
	}

}
