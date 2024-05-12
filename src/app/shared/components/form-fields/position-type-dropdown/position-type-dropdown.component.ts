import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../shared/models/select-option';
import { PositionTypeService } from 'src/app/shared/services/dropdowns/position-type.service';
const POSITION_TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => PositionTypeDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-position-type-dropdown',
	templateUrl: './position-type-dropdown.component.html',
	providers: [POSITION_TYPE_CONTROL_ACCESSOR]
})
export class PositionTypeDropdownComponent implements OnInit, ControlValueAccessor {
	public positionTypes: SelectOption[] = [];
	public positionTypeId!: string | null;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	constructor(private positionTypeService: PositionTypeService) { }

	async ngOnInit(): Promise<void> {
		this.positionTypes = await this.positionTypeService.getAll();
	}

	writeValue(obj: any): void {
		this.positionTypeId = obj !== null ? obj : null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.positionTypeId);
	}

	public onClick() {
		this.onTouch();
	}

}
