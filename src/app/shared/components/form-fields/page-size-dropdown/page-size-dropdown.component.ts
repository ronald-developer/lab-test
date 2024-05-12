import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/shared/models/select-option';

const NUMBER_DROPDOWN_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => PageSizeDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-page-size-dropdown',
	templateUrl: './page-size-dropdown.component.html',
	providers: [NUMBER_DROPDOWN_CONTROL_ACCESSOR]
})
export class PageSizeDropdownComponent implements OnInit, ControlValueAccessor {
	@Input() options: SelectOption[] = [];
	public optionId: number;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() fieldTitle!: string;
	@Input() invalid!: boolean;

	constructor() { }

	async ngOnInit(): Promise<void> {
	}

	writeValue(obj: any): void {
		this.optionId = obj || 0;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.optionId);
	}

	public onClick() {
		this.onTouch();
	}
}
