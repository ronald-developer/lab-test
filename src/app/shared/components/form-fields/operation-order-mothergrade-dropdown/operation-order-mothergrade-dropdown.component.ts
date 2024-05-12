import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOptionData } from '../../../models/select-option-data';
import { OperationOrderMotherGradeService } from 'src/app/shared/services/dropdowns/operation-order-mother-grade.service';
import { OperationOrderData } from './models/operation-order-mothergrade-data';
const OPERATION_ORDER_MOTHERGRADE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => OperationOrderMothergradeDropdownComponent),
	multi: true
}
@Component({
	selector: 'app-operation-order-mothergrade-dropdown',
	templateUrl: './operation-order-mothergrade-dropdown.component.html',
	providers: [OPERATION_ORDER_MOTHERGRADE_CONTROL_ACCESSOR]
})
export class OperationOrderMothergradeDropdownComponent implements OnInit {

	public operationOrderMotherGradeOptions: SelectOptionData<OperationOrderData>[] = [];

	public operationOrderId!: number;
	public motherGradeCode: string = '';
	private onChange!: Function;
	private onTouch!: Function;
	@Input() disabled!:boolean;
	@Input() invalid!: boolean;
	@Output() operationOrderChanged = new EventEmitter<void>();
	@Output() motherGradeCodeChanged = new EventEmitter<number>();

	constructor(
		private operationOrderMotherGradeService: OperationOrderMotherGradeService,
		private detector: ChangeDetectorRef) { }

	async ngOnInit(): Promise<void> {
		this.operationOrderMotherGradeOptions = await this.operationOrderMotherGradeService.getAll();
		this.setMotherGradeCode();
	}

	writeValue(obj: any): void {
		this.operationOrderId = obj || null;
		if (!this.operationOrderId) {
			this.motherGradeCode = '';
		}
		this.detector.detectChanges();
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.setMotherGradeCode();
		this.onChange(this.operationOrderId);
		this.operationOrderChanged.emit();
	}

	private setMotherGradeCode() {
		if (this.operationOrderId) {
			const operationOrder = this.operationOrderMotherGradeOptions.find(f => f.key == this.operationOrderId);
			if (operationOrder) {
				this.motherGradeCode = operationOrder.data.motherGradeCode;
				this.motherGradeCodeChanged.emit(operationOrder.data.motherGradeId);
			}
		} else {
			this.motherGradeCode = '';
		}
	}

	public onClick() {
		this.onTouch();
	}

}
