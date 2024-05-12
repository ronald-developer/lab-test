import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/shared/models/select-option';
import { ShakerService } from 'src/app/shared/services/dropdowns/shaker.service';

const SHAKER_TYPES_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ShakerDropdownComponent),
	multi: true
}


@Component({
	selector: 'app-shaker-dropdown',
	templateUrl: './shaker-dropdown.component.html',
	providers: [SHAKER_TYPES_CONTROL_ACCESSOR]
})
export class ShakerDropdownComponent implements ControlValueAccessor, OnInit {

	public shakers: SelectOption[] = [];
	public shakerId!: string;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;

	@Output() shakerChanged = new EventEmitter<void>();

	constructor(private shakerService: ShakerService) {

	}
	async ngOnInit(): Promise<void> {
		this.shakers = await this.shakerService.getAll();
	}

	writeValue(obj: any): void {
		this.shakerId = obj || 0;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.shakerId);
		this.shakerChanged.emit();
	}

	public onClick() {
		this.onTouch();
	}

}
