import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChargerTypeService } from '../../../../shared/services/dropdowns/charger.service';
import { SelectOption } from '../../../../shared/models/select-option';
const CHARGER_TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ChargerTypeDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-charger-type-dropdown',
	templateUrl: './charger-type-dropdown.component.html',
	providers: [CHARGER_TYPE_CONTROL_ACCESSOR]
})
export class ChargerTypeDropdownComponent implements OnInit, ControlValueAccessor {
	public chargerTypes: SelectOption[] = [];
	public chargerTypeId!: string | null;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	constructor(private chargerTypeService: ChargerTypeService) { }

	async ngOnInit(): Promise<void> {
		this.chargerTypes = await this.chargerTypeService.getAll();
	}

	writeValue(obj: any): void {
		this.chargerTypeId = obj !== null ? obj : null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.chargerTypeId);
	}

	public onClick() {
		this.onTouch();
	}

}
