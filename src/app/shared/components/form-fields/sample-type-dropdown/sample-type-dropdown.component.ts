import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SampleTypeService } from 'src/app/shared/services/dropdowns/sample-type.service';
import { SelectOption } from '../../../../shared/models/select-option';
const SAMPLE_TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SampleTypeDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-sample-type-dropdown',
	templateUrl: './sample-type-dropdown.component.html',
	providers: [SAMPLE_TYPE_CONTROL_ACCESSOR]
})
export class SampleTypeDropdownComponent implements OnInit, ControlValueAccessor {
	public sampleTypes: SelectOption[] = [];
	public sampleTypeId!: string | null;
	private onChange!: Function;
	private onTouch!: Function;
	@Input() invalid!: boolean;
	constructor(private sampleTypeService: SampleTypeService) { }

	async ngOnInit(): Promise<void> {
		this.sampleTypes = await this.sampleTypeService.getAll();
	}

	writeValue(obj: any): void {
		this.sampleTypeId = obj !== null ? obj : null;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public selectionChanged() {
		this.onChange(this.sampleTypeId);
	}

	public onClick() {
		this.onTouch();
	}

}
