import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ResponseNtrmLocationModel } from 'src/app/api-services/setup/ntrm-location-api/models/response-ntrm-location-model';
import { SelectOption } from 'src/app/shared/models/select-option';
import { NtrmLocationService } from 'src/app/shared/services/dropdowns/ntrm-location.service';

const NTRM_LOCATION_TYPES_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => NtrmLocationTypesDropdownComponent),
	multi: true
}


@Component({
	selector: 'app-ntrm-location-types-dropdown',
	templateUrl: './ntrm-location-types-dropdown.component.html',
	providers: [NTRM_LOCATION_TYPES_CONTROL_ACCESSOR]
})
export class NtrmLocationTypesDropdownComponent implements ControlValueAccessor, OnInit {

	public ntrmLocations: SelectOption[] = [];
	public ntrmLocationId!: string;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;

	@Output() ntrmLocationChanged = new EventEmitter<void>();

	constructor(private ntrmLocationService: NtrmLocationService) {

	}
	async ngOnInit(): Promise<void> {
		this.ntrmLocations = await this.ntrmLocationService.getAll();
	}

	writeValue(obj: any): void {
		this.ntrmLocationId = obj || 0;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.ntrmLocationId);
		this.ntrmLocationChanged.emit();
	}

	public onClick() {
		this.onTouch();
	}

}
