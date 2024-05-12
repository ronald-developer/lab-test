import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/shared/models/select-option';
import { MaterialTypeService } from 'src/app/shared/services/dropdowns/material-type.service';
const MATERIAL_TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => TestMaterialTypeDropdownComponent),
	multi: true
}

@Component({
  selector: 'app-test-material-type-dropdown',
  templateUrl: './test-material-type-dropdown.component.html',
  providers: [MATERIAL_TYPE_CONTROL_ACCESSOR]
})
export class TestMaterialTypeDropdownComponent implements OnInit, ControlValueAccessor {
	public materialTypes: SelectOption[] = [];
    public materialTypeId!: string | null;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor(private materialTypeService: MaterialTypeService) { }

    async ngOnInit(): Promise<void> {
        this.materialTypes = await this.materialTypeService.getAll();
    }

    writeValue(obj: any): void {
        this.materialTypeId = obj !== null ? obj : null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.materialTypeId);
    }

    public onClick() {
        this.onTouch();
    }
}
